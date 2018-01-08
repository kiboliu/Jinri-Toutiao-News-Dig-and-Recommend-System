from cloudAMQP_client import CloudAMQPClient

CLOUDAMQP_URL = "amqp://dfhnzyyp:rtpeC14EjAYnTaap3c1rK9_YVjd_vs4O@termite.rmq.cloudamqp.com/dfhnzyyp"
TEST_QUEUE_NAME = "test"

def test_basic():
    client = CloudAMQPClient(CLOUDAMQP_URL, TEST_QUEUE_NAME)
   
    sendMsg = {"test":"test"}

    client.sendMessage(sendMsg)
    
    receiveMsg = client.getMessage()

    assert sendMsg == receiveMsg
    print("test_basic passed!")

if __name__ == "__main__":
    test_basic()