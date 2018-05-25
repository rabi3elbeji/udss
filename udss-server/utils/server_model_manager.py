from utils.client_websocket import ClientWebSocket


class ServerModelManager(object):
    """docstring for ServerModelManager"""
    def __init__(self):
        super(ServerModelManager, self).__init__()


    def connectToModelServers(self, servers):
        # var to store connection to servers
        modelServers = {}
        # loop servers
        for (i, server) in enumerate(servers):
            server_id = server['id']
            server_url = server['address']
            modelServerWS = ClientWebSocket(server_url)
            modelServers[server_id] = modelServers
        return modelServers
