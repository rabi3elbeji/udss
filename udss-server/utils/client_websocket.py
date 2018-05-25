import websocket
import _thread
import time


class ClientWebSocket(object):

    """docstring for clientWebSocket"""
    def __init__(self, host):
        super(ClientWebSocket, self).__init__()
        websocket.enableTrace(True)
        ws = websocket.WebSocketApp(host)
        self.ws = ws
        ws.on_open = self.on_open
        ws.on_message = self.on_message
        ws.on_error = self.on_error
        ws.on_close = self.on_close
        ws.run_forever()

    def on_message(self, ws, message):
        print(message)

    def on_error(self, ws, error):
        print(error)

    def on_close(self, ws):
        print("### closed ###")

    def on_open(self, ws):
        ws.send("Hello from udss")

    def sendData(self, data):
        self.ws.send(data)