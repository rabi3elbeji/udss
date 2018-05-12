from SimpleWebSocketServer import SimpleWebSocketServer, WebSocket

class SimpleEcho(WebSocket):

    def handleMessage(self):
        # echo message back to client
        self.sendMessage(self.data)
        print(self.data)
        print(self.data)

    def handleConnected(self):
        print(self.address, 'connected')

    def handleClose(self):
        print(self.address, 'closed')


host = '10.42.0.1'
port = 9000

server = SimpleWebSocketServer('10.42.0.1', 9000, SimpleEcho)
server.serveforever()