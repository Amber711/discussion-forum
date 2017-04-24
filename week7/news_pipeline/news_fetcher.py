# -*- coding: utf-8 -*-


import os
import sys
from newspaper import Article

sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'))
sys.path.append(os.path.join(os.path.dirname(__file__), 'scrapers'))

import cnn_news_scraper
from cloudAMQP_client import CloudAMQPClient

#queue which scraper put the news
SCRAPE_NEWS_TASK_QUEUE_URL = "amqp://plxgbrdw:vHoQBz-9tL_jRPkx--lcGhp1FCV6yZbk@clam.rmq.cloudamqp.com/plxgbrdw"
SCRAPE_NEWS_TASK_QUEUE_NAME = "cs503_tap_news"

#handle news, then store in another queue
DEDUPER_NEWS_TASK_QUEUE_URL = "amqp://uvrbifmd:IhbtFUAbbl_F1yBQr32gohuTMU2n6JsW@donkey.rmq.cloudamqp.com/uvrbifmd"
DEDUPER_NEWS_TASK_QUEUE_NAME = "news_for_deduper"

SLEEP_TIME_IN_SECONDS = 5

deduper_news_queue_client = CloudAMQPClient(DEDUPER_NEWS_TASK_QUEUE_URL, DEDUPER_NEWS_TASK_QUEUE_NAME)
scrape_news_queue_client = CloudAMQPClient(SCRAPE_NEWS_TASK_QUEUE_URL, SCRAPE_NEWS_TASK_QUEUE_NAME)


def handle_message(msg):
    if msg is None or not isinstance(msg, dict):
        print 'message is broken'
        return
    task = msg

    # we support CNN only for now
    '''if task['source'] == 'cnn':
        print 'Scraping cnn news'
        text = cnn_news_scraper.extract_news(task['url'])
        print type(text)
    else:
        print 'News source [%s] is not supported.' % task['source']'''

    #use newspaper to substitute xpath.
    article = Article(task['url'])
    article.download()
    article.parse()
    task['text'] = article.text
    print "*************** task['text']:" ,task['text']
    deduper_news_queue_client.sendMessage(task)

while True:
    # fetch msg from queue which scraper put news at
    # handle message, store in another queue
    if scrape_news_queue_client is not None:
        msg = scrape_news_queue_client.getMessage()
        if msg is not None:
            #handle message
            try:
                handle_message(msg)

            except Exception as e:
                print e
                pass
        scrape_news_queue_client.sleep(SLEEP_TIME_IN_SECONDS);
