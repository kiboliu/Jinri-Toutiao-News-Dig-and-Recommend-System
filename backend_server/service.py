import json
import sys
import os
from bson.json_util import dumps
from jsonrpclib.SimpleJSONRPCServer import SimpleJSONRPCServer

# import utils packages
sys.path.append(os.path.join(os.path.dirname(__file__), 'utils'))

import mongodb_client
# define the host and port
SERVER_HOST = 'localhost'
SERVER_PORT = 4040

# test if the server is running correctly
def add(a, b):
    print("Add is called with %d and %d" % (a, b))
    return a + b

def getOneNews():
    print("get_one_news is called.")
    news = mongodb_client.get_db()['news'].find_one()
    # dumps bson to string and then to json
    return json.loads(dumps(news))

RPC_SERVER = SimpleJSONRPCServer((SERVER_HOST, SERVER_PORT))

# export functions
RPC_SERVER.register_function(add, 'add')
RPC_SERVER.register_function(getOneNews, 'getOneNews')

print("Start RPC Server on %s:%d" % (SERVER_HOST, SERVER_PORT))

RPC_SERVER.serve_forever()