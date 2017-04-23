# -*- coding: utf-8 -*-


import os
import sys
import redis
import hashlib
import datetime

sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'))
import news_api_client

from cloudAMQP_client import CloudAMQPClient

REDIS_HOST = 'localhost'
REDIS_PORT = 6379

NEWS_TIME_OUT_IN_SECONDS = 3600 * 24
SLEEP_TIME_IN_SECONDS = 10

# Use your own Cloud AMQP queue
SCRAPE_NEWS_TASK_QUEUE_URL = "amqp://plxgbrdw:vHoQBz-9tL_jRPkx--lcGhp1FCV6yZbk@clam.rmq.cloudamqp.com/plxgbrdw"
SCRAPE_NEWS_TASK_QUEUE_NAME = "cs503_tap_news"

NEWS_SOURCES = [
    'cnn',

]

redis_client = redis.StrictRedis(REDIS_HOST, REDIS_PORT)
cloudAMQP_client = CloudAMQPClient(SCRAPE_NEWS_TASK_QUEUE_URL, SCRAPE_NEWS_TASK_QUEUE_NAME)

while True:
    news_list = news_api_client.getNewsFromSource(NEWS_SOURCES)
    num_of_new_news = 0

    for news in news_list:
        #md5 every news's title, use the result as a key.
        news_digest = hashlib.md5(news['title'].encode('utf-8')).digest().encode('base64')

        if redis_client.get(news_digest) is None:
            num_of_new_news = num_of_new_news + 1
            news['digest'] = news_digest

            if news['publishedAt'] is None:
                 # format: YYYY-MM-DDTHH:MM:SS in UTC
                news['publishedAt'] = datetime.datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')

                #store news in redis
            redis_client.set(news_digest, news)
            redis_client.expire(news_digest, NEWS_TIME_OUT_IN_SECONDS)

            #send message to queue
            cloudAMQP_client.sendMessage(news)


    print 'Fetched %d new news.' %num_of_new_news

    cloudAMQP_client.sleep(SLEEP_TIME_IN_SECONDS)
