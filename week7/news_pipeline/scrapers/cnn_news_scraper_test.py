import cnn_news_scraper as scraper

EXPECTED_STRING = "A White House foreign policy adviser on board immediately tried to downplay the significance, "
CNN_NEWS_URL = "http://www.cnn.com/2017/04/16/politics/mike-pence-korea-trip/index.html"

def test_basic():
    news = scraper.extract_news(CNN_NEWS_URL)

    assert  EXPECTED_STRING in news
    print 'test_basic passed'


if __name__ == '__main__':
    test_basic()