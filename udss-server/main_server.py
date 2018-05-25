import ssl
from SimpleWebSocketServer import WebSocket, SimpleSSLWebSocketServer
import json
import os
import _thread
from utils.msql_manager import MySQLManager
from utils.server_model_manager import ServerModelManager

# Init mysql manager
mySQLManager = MySQLManager("localhost", "root", "")


# Get all servers
serversInfo = mySQLManager.getAllServers()
#_thread.start_new_thread(serverModelManager.connectToModelServers(serversInfo), ())
#modelServerWS = serverModelManager.connectToModelServers(serversInfo)


class UdssServer(WebSocket):

    def __init__(self):
        super(UdssServer, self).__init__()
        serversInfo = mySQLManager.getAllServers()
        self.connectToModelServers(serversInfo)

    def handleConnected(self):
        print(self.address, 'connected')
        #serverModelManager = ServerModelManager()
        #self.modelServerWS = serverModelManager.connectToModelServers(serversInfo)


    def handleClose(self):
        print(self.address, 'closed')


    def handleMessage(self):
        # echo message back to client
        #self.sendMessage("Thanks client, well recieved")

        # Parse JSON into an object with attributes corresponding to dict keys.
        receivedImages = json.loads(self.data)
        serversInfo = mySQLManager.getAllServers()
        # filter the appropriate images top each server
        serverImages = self.filterServersByReceivedData(serversInfo, receivedImages)
        self.sendDataToServers(serversInfo, serverImages)

    # Filter server by data
    def filterServersByReceivedData(self, servers, images):
        # output var
        serverImages = {}

        # loop servers
        for (i, server) in enumerate(servers):
            serverId = server['id']
            serverImageHeight = server['image_height']
            serverImageWidth = server['image_width']
            serverImageType = server['image_type']

            # loop data
            for (j, image) in enumerate(images):
                recvImageHeight = image['height']
                recvImageWidth = image['width']
                recvImageUrl = image['url']
                recvImageName, recvImageType = os.path.splitext(recvImageUrl)
                recvImageType = recvImageType[1:]

                # choose the appropriate image

            '''
                We will add all images bcz is just an exemple
            '''
            serverImages[serverId] = images

        return serverImages

    def sendDataToServers(self, servers, data):
        # loop servers
        for (serverId, images) in enumerate(data):
            serverWS = modelServerWS[serverId]
            serverWS.sendData(images)

    def getServerAdress(self, servers, id):
        # loop servers
        for (i, server) in enumerate(servers):
            serverId = server['id']
            serverAdress =server['address']
            if(serverId == id):
                break
        return serverAdress




cls = UdssServer
host = 'localhost'
port = 9000
cert = '../cert/cert.pem'
key = '../cert/key.pem'
protocol = ssl.PROTOCOL_TLSv1

server = SimpleSSLWebSocketServer(host, port, cls, cert, key, version=protocol)
server.serveforever()


