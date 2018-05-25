from SimpleWebSocketServer import SimpleWebSocketServer, WebSocket

class SimpleEcho(WebSocket):

    def handleMessage(self):
        # echo message back to client
        #self.sendMessage(self.data)
        print(self.data)

    def handleConnected(self):
        print(self.address, 'connected')
        self.sendMessage("hiii from server model 1 ...")

    def handleClose(self):
        print(self.address, 'closed')

server = SimpleWebSocketServer('localhost', 9001, SimpleEcho)
server.serveforever()

