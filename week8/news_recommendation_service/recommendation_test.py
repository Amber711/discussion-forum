import pyjsonrpc

URL = 'http://localhost:5050/'
client = pyjsonrpc.HttpClient(url=URL)

def getPreferenceForUser(userId):
    preference = client.call('getPreferenceForUser', userId)
    print 'preference list %s' %str(preference)
    return preference

if __name__ == '__main__':
    getPreferenceForUser('test_user')