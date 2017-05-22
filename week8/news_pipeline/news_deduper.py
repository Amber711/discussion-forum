# -*- coding: utf-8 -*-

import datetime
import os
import sys

from dateutil import parser
from sklearn.feature_extraction.text import TfidfVectorizer

# import common package in parent directory
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'))

import mongodb_client
from cloudAMQP_client import CloudAMQPClient

# Use your own Cloud AMQP queue

DEDUPER_NEWS_TASK_QUEUE_URL = "amqp://uvrbifmd:IhbtFUAbbl_F1yBQr32gohuTMU2n6JsW@donkey.rmq.cloudamqp.com/uvrbifmd"
DEDUPER_NEWS_TASK_QUEUE_NAME = "news_for_deduper"

SLEEP_TIME_IN_SECONDS = 3

NEWS_TABLE_NAME = "news"

SAME_NEWS_SIMILARITY_THRESHOLD = 0.9

cloudAMQP_client = CloudAMQPClient(DEDUPER_NEWS_TASK_QUEUE_URL, DEDUPER_NEWS_TASK_QUEUE_NAME)

def handle_message(msg):
    if msg is None or not isinstance(msg, dict) :
        return
    task = msg
    text = str(task['text'])
    if text is None:
        return

    # get all recent news based on publishedAt
    published_at = parser.parse(task['publishedAt'])
    published_at_day_begin = datetime.datetime(published_at.year, published_at.month, published_at.day, 0, 0, 0, 0)
    published_at_day_end = published_at_day_begin + datetime.timedelta(days=1)

    db = mongodb_client.get_db()

    # Get news in the recent time frame: within 1 day from mongodb
    same_day_news_list = list(db[NEWS_TABLE_NAME].find({'publishedAt': {'$gte': published_at_day_begin, '$lt': published_at_day_end}}))

    # Filter every single news for the similar one.
    if same_day_news_list is not None and len(same_day_news_list) > 0:
        # collect the text of news grabbed from mongodb to documents : [str] //str: news['text']
        documents = [str(news['text']) for news in same_day_news_list]

        # Insert the news we just grab from AMQP(deduper_news_queue) to documents : at the front of the list
        documents.insert(0, text)

        # Calculate similarity matrix
        tfidf = TfidfVectorizer().fit_transform(documents)
        pairwise_sim = tfidf * tfidf.T

        print pairwise_sim.A

        rows, _ = pairwise_sim.shape

        for row in range(1, rows):
            if pairwise_sim[row, 0] > SAME_NEWS_SIMILARITY_THRESHOLD:
                # Duplicated news. Ignore.
                print "Duplicated news. Ignore."
                return
    task['publishedAt'] = parser.parse(task['publishedAt'])

    db[NEWS_TABLE_NAME].replace_one({'digest': task['digest']}, task, upsert=True)

while True:
    if cloudAMQP_client is not None:
        msg = cloudAMQP_client.getMessage()
        if msg is not None:
            # Parse and process the task
            try:
                handle_message(msg)
            except Exception as e:
                print e
                pass

        cloudAMQP_client.sleep(SLEEP_TIME_IN_SECONDS)
