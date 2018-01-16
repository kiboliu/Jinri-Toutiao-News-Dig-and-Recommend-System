#!/bin/bash

# Linux
service redis_6378 start
service mongod start

# Mac
# redis-server
# brew services start mongodb

pip3 install -r requirement.txt

cd news_pipeline
python3 news_monitor.py &
python3 news_fetcher.py &
python3 news_duduper.py &

echo "=================================================="
read -p "PRESS [ENTER] TO TERMINATE PROCESSES" PRESSKEY

kill $(jobs -p)