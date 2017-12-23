const redisClient = require('../modules/redisClient');
const TIMEOUT_IN_SECONDS = 3600;
module.exports = function(io) {
    // collaboration sessions
    const collaborations = {};
    // map from socketId to sessionId
    const socketIdToSessionId = {};

    const sessionPath = '/temp_sessions/';

    io.on('connection', (socket) => {
        //console.log(socket);
        const sessionId = socket.handshake.query['sessionId'];
        socketIdToSessionId[socket.id] = sessionId;
        // if (!(sessionId in collaborations)) {
        //     collaborations[sessionId] = {
        //         'participants': [] 
        //     };
        // }
        // collaborations[sessionId]['participants'].push(socket.id);

        if (sessionId in collaborations) {
            collaborations[sessionId]['participants'].push(socket.id);          
        } else {
            redisClient.get(sessionPath + '/' + sessionId, data => {
                if (data) {
                    console.log('session terminated perviously, pulling back from redis');
                    collaborations[sessionId] = {
                        'cachaedInstructions': JSON.parse(data),
                        'participants': []
                    }
                } else {
                    console.log('creating new sessions.');
                    collaborations[sessionId] = {
                        'cachaedInstructions': [],
                        'participants': []
                    }
                }
                collaborations[sessionId]['participants'].push(socket.id);
            });
        }

        socket.on('change', delta => {
            const sessionId = socketIdToSessionId[socket.id];
            if (sessionId in collaborations) {
                collaborations[sessionId]['cachaedInstructions'].push(['change', delta, Date.now()]);
            }
            if (sessionId in collaborations) {
                const participants = collaborations[sessionId]['participants'];
                for (let participant of participants) {
                    if (socket.id !== participant) {
                        io.to(participant).emit('change', delta);
                    }
                }
            } else {
                console.error('error');
            }
        });
        // when client call the buffer
        socket.on('restoreBuffer', () => {
            const sessionId = socketIdToSessionId[socket.id];
            if (sessionId in collaborations) {
                const instructions = collaborations[sessionId]['cachaedInstructions'];
                for (let instruction of instructions) {
                    socket.emit(instruction[0], instruction[1]);
                }
            }
        })
        // store instruction in redis when disconnect(judge if the last people is left)
        socket.on('disconnect', () => {
            const sessionId = socketIdToSessionId[socket.id];
            let foundAndRemove = false;
            if (sessionId in collaborations) {
                const participants = collaborations[sessionId]['participants'];
                const index = participants.indexOf(socket.id);
                if (index >= 0) {
                    // slice: delele at index and delete amount.
                    participants.slice(index, 1);
                    foundAndRemove = true;
                    // it is the last people
                    if (participants.length === 0) {
                        // store address
                        const key = sessionPath + '/' + sessionId;
                        const value = JSON.stringify(collaborations[sessionId]['cachaedInstructions']);
                        redisClient.set(key, value, redisClient.redisPrint);
                        redisClient.expire(key, TIMEOUT_IN_SECONDS);
                        delete collaborations[sessionId];
                    }
                }
            }
            if (!foundAndRemove) {
                console.error('error');
            }
        });
    });
}