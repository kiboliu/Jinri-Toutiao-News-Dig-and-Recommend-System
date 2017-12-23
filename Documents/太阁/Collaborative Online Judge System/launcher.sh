#! /bin/bash

# kill the process listening on the port 3000/5000
lsof -P | grep ':3000' | awk '{print $2}' | xargs kill -9
lsof -P | grep ':5000' | awk '{print $2}' | xargs kill -9

redis-server &

cd ./oj-server
nodemon server.js &

cd ../executor
pip3 install -r requirements.txt
python3 executor_server.py &

echo "=========================="
read -p "PRESS [ENTER] to terminate processes." PRESSKEY

# kill the process listening on the port 3000/5000
lsof -P | grep ':3000' | awk '{print $2}' | xargs kill -9
lsof -P | grep ':5000' | awk '{print $2}' | xargs kill -9
redis-cli shutdown