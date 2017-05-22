import json
import os
import pickle
import redis
import sys


sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'))

from bson.json_util import dumps
import mongodb_client
from datetime import datetime

REDIS_HOST = "localhost"
REDIS_PORT = "6379"

NEWS_TABLE_NAME = "news"
CLICK_LOGS_TABLE_NAME = 'click_logs'

NEWS_LIMIT = 100
NEWS_LIST_BATCH_SIZE = 10
USER_NEWS_TIME_OUT_IN_SECONDS = 60

LOG_CLICKS_TASK_QUEUE_URL ='amqp://seoegmme:YwxZYMkMT3UTObj-Hw7CXSPLx2EIXhzh@donkey.rmq.cloudamqp.com/seoegmme'
LOG_CLICKS_TASK_QUEUE_NAME ='click_logger_queue'

redis_client = redis.StrictRedis(REDIS_HOST, REDIS_PORT, db=0)

from cloudAMQP_client import CloudAMQPClient

cloudAMQP_client = CloudAMQPClient(LOG_CLICKS_TASK_QUEUE_URL, LOG_CLICKS_TASK_QUEUE_NAME)

def getNewsSummariesForUser(user_id, page_num):
    page_num = int(page_num)
    #begin_index starts from the last page user visited last time
    begin_index = (page_num - 1) * NEWS_LIST_BATCH_SIZE
    end_index = page_num * NEWS_LIST_BATCH_SIZE

    #the final news list to be returned.
    sliced_news = []

    if redis_client.get(user_id) is not None:
        # To get all the digests of the news based on the user_id
        # In order to save more storage , we only store news-digest in redis.
        news_digests = pickle.loads(redis_client.get(user_id))

        # If the begin_index is out of range, this will return empty list
        # If end_index is out of range (and begin_index is within the range),
        # this will return all the remaining news ids.
        sliced_news_digests = news_digests[begin_index:end_index]
        print "-----sliced_news_digests-----", sliced_news_digests

        # Get the complete news from db
        db = mongodb_client.get_db()
        #list() converts the the iterable passed to it to a list[].
        sliced_news = list(db[NEWS_TABLE_NAME].find({'digest':{'$in':sliced_news_digests}}))
    else:
        db = mongodb_client.get_db()
        # Get all the news in a reversed order(starts from the latest news)
        total_news = list(db[NEWS_TABLE_NAME].find().sort([('publishedAt', -1)]).limit(NEWS_LIMIT))

        # To store the digests of all the news into redis:

        # first, user lambda$map() to get the [digest]:list from all the news
        total_news_digests = map(lambda x:x['digest'], total_news)

        redis_client.set(user_id, pickle.dumps(total_news_digests))
        redis_client.expire(user_id, USER_NEWS_TIME_OUT_IN_SECONDS)

        sliced_news = total_news[begin_index:end_index]

    return json.loads(dumps(sliced_news))

'''def logNewsClickForUser(user_id, news_id):
    message = {'userId': user_id, 'newsId': news_id, 'timestamp': timestamp.utcnow()}

    #why do we need to store log in db?
    db = mongodb_client.get_db()
    db[CLICK_LOGS_TABLE_NAME].insert(message)

    # Send log task to machine learning service for prediction
    message = {'userId': user_id, 'newsId': news_id, 'newsstamp': str(timestamp.utcnow())}
    cloudAMQP_client.sendMessage(message)'''

def logNewsClickForUser(user_id, news_id):
    message = {'userId': user_id, 'newsId': news_id, 'timestamp': datetime.utcnow()}

    db = mongodb_client.get_db()
    db[CLICK_LOGS_TABLE_NAME].insert(message)

    # Send log task to machine learning service for prediction
    message = {'userId': user_id, 'newsId': news_id, 'timestamp': str(datetime.utcnow())}
    cloudAMQP_client.sendMessage(message);