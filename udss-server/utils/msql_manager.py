import MySQLdb


class MySQLManager(object):
    """docstring for MySQL"""

    def __init__(self, host, user, passwd):
        super(MySQLManager, self).__init__()
        self.host = host
        self.user = user
        self.passwd = passwd
        self.cursor = self.connectToServer()

    def connectToServer(self):
        db = MySQLdb.connect(host=self.host,  # your host
                             user=self.user,  # username
                             passwd=self.passwd,  # password
                             db="udss")  # name of the database
        # Create a Cursor object to execute queries.
        cursor = db.cursor(MySQLdb.cursors.DictCursor)
        return cursor

    def getAllServers(self):
        # init query to get all server with their info
        sqlQuery = "SELECT servers.`id` as id, `name`, `address` , criteria.image_height as image_height, criteria.image_width as image_width, criteria.image_type as image_type FROM `servers`, `criteria` WHERE criteria.server_id=servers.id"
        # exec request
        self.cursor.execute(sqlQuery)
        # fetech data
        results = self.cursor.fetchall()
        return  results
