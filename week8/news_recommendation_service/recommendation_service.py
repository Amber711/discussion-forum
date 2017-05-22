import os
import sys
import pyjsonrpc
import operator

# import common package in parent directory
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'))
import mongodb_client

PREFERENCE_MODEL_TABLE_NAME = "user_preference_model"

SERVER_HOST = 'localhost'
SERVER_PORT = 5050

# Ref: https://www.python.org/dev/peps/pep-0485/#proposed-implementation
# Ref: http://stackoverflow.com/questions/5595425/what-is-the-best-way-to-compare-floats-for-almost-equality-in-python
def isclose(a, b, rel_tol=1e-09, abs_tol=0.0):
    return abs(a-b) <= max(rel_tol * max(abs(a), abs(b)), abs_tol)

class RequestHandler(pyjsonrpc.HttpRequestHandler):
    """ Get user's preference in an ordered class list """
    @pyjsonrpc.rpcmethod
    def getPreferenceForUser(self, user_id):
        db = mongodb_client.get_db()
        '''
            a single user has a single news_model
            new_model = {
            userId: userId,
            preference: {
              "Colleges & Schools" :  0.058,
              "Environmental" : 0.058
              ...
            }
        '''
        model = db[PREFERENCE_MODEL_TABLE_NAME].find_one({'userId': user_id})
        if model is None:
            return []

        # A tuple sorted by value, descending.
        '''[(u'World', 0.15294117647058825), (u'Weather', 0.052941176470588235),
        (u'Politics & Government', 0.052941176470588235), (u'Entertainment', 0.052941176470588235),
        (u'Media', 0.052941176470588235), (u'Colleges & Schools', 0.052941176470588235),
        (u'Advertisements', 0.052941176470588235), (u'Sports', 0.052941176470588235),
        (u'Religion', 0.052941176470588235), (u'Magazine', 0.052941176470588235), (u'Other', 0.052941176470588235),
        (u'Traffic', 0.052941176470588235), (u'Regional News', 0.052941176470588235),
        (u'Economic & Corp', 0.052941176470588235), (u'Crime', 0.052941176470588235),
        (u'Technology', 0.052941176470588235), (u'Environmental', 0.052941176470588235)]
        '''
        sorted_tuples = sorted(model['preference'].items(),key=operator.itemgetter(1), reverse=True)
        print '<< sorted_tuples:', sorted_tuples
        # List of keys of preference [key]
        sorted_list = [x[0] for x in sorted_tuples]
        print '<< sorted_list:', sorted_list
        # List of value of preference [value]
        sorted_value_list = [x[1] for x in sorted_tuples]
        print'<< sorted_value_list:', sorted_value_list

        # If the first preference is same as the last one, the preference makes no sense.
        if isclose(float(sorted_value_list[0]), float(sorted_value_list[-1])):
            return

        return sorted_list

    # Threading HTTP server

http_server = pyjsonrpc.ThreadingHttpServer(
    server_address = (SERVER_HOST, SERVER_PORT),
    RequestHandlerClass = RequestHandler
    )
print "Starting HTTP server on %s:%d" % (SERVER_HOST, SERVER_PORT)

http_server.serve_forever()