// let problems = [
//     {
//         "id": 1,
//         "name": "Two Sum",
//         "desc": "Given an array of integers ,find two numbers such that they add up to a specific target number.\n",
//         "difficulty": "easy"
//     },
//     {
//         "id":2,
//         "name":"3Sum",
//         "desc":"Given an array S of n integers, are there elements a,b,c in S such that a + b + c = 0?",
//         "difficulty":"medium"
//     },
//     {
//         "id":3,
//         "name":"4Sum",
//         "desc":"Given an array S of integers, are there elements a,b,c,d in S such that a + b + c + d = 0?",
//         "difficulty":"medium"
//     },
//     {
//         "id":4,
//         "name":"Triangle Count",
//         "desc":"Given an array of integers, how many three numbers can be found in the array, so that we can build a triange",
//         "difficulty":"hard"
//     },
//     {
//         "id":5,
//         "name":"Sliding Window Maximum",
//         "desc":"Given an array of n integer with duplicate number, and a moving window (size k), move the window",
//         "difficulty":"super"
//     }
// ];
const ProblemModel = require('../models/problemModel');
const getProblems = function(){
    // return new Promise((resolve, reject) => {
    //     resolve(problems);
    // });
    return new Promise((resolve, reject) => {
        ProblemModel.find({},(err, problems) => {
            if (err) {
                reject(err);
            } else {
                resolve(problems);
            }
        })
    });
}
const getProblem = function(idNumber) {
    // return new Promise((resolve, reject) => {
    //     resolve(problems.find(problem => problem.id == id));
    // });
    return new Promise((resolve, reject) => {
        //find id==idNumber in schema
        ProblemModel.findOne ({id: idNumber}, (err, problem) => {
            if (err) {
                reject(err);
            } else {
                resolve(problem);
            }
        });
    });
}
const addProblem = function(newProblem) {
    // return new Promise((resolve, reject) => {
    //     if (problems.find(problem => problem.name == newProblem.name)) {
    //         reject('Problem already exists!');
    //     } else  {
    //         newProblem.id = problems.length + 1;
    //         problems.push(newProblem);
    //         resolve(newProblem);
    //     }
    // });
    return new Promise((resolve, reject) => {
        // check if the problem has already been added to the db
        ProblemModel.findOne({name: newProblem.name}, (err, data) => {
            if (data) {
                reject('Problem already exists!');
            } else {
                //save to mongoDB
                ProblemModel.count({}, (err, count) => {
                    newProblem.id = count + 1;
                    const mongoProblem = new ProblemModel(newProblem);
                    mongoProblem.save();
                    resolve(mongoProblem);
                });
            }
        });
    });
}
module.exports = {
    getProblems,
    getProblem,
    addProblem
}
