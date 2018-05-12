from socket import *

host = "localhost"
port = 9000

# creat the server for first model
def createServer():
    serversocket = socket(AF_INET, SOCK_STREAM)
    serversocket.bind((host, port))
    serversocket.listen(5)
    while(1):
        (clientsocket, address) = serversocket.accept()
        print(address)
    serversocket.close()

createServer()