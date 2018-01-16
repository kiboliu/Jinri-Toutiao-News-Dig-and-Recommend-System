import requests
import os
import random
from lxml import html
GET_CNN_NEWS_XPATH = """//p[contains(@class, 'zn-body__paragraph')]//text() | //div[contains(@class, 'zn-body__paragraph')]//text()"""

USER_AGENTS = []
USER_AGENTS_FILE = os.path.join(os.path.dirname(__file__), 'user-agents.txt')
with open(USER_AGENTS_FILE, 'rb') as uaf:
    for ua in uaf.readlines():
        if ua:
            USER_AGENTS.append(ua)
random.shuffle(USER_AGENTS)

def getHeaders():
    ua = random.choice(USER_AGENTS)
    headers = {
        "Connection":"close",
        "User-Agent":ua
    }
def extractNews(news_url):
    session_request = requests.session()
    response = session_request.get(news_url, headers=getHeaders())
    news = {}

    try:
        tree = html.fromstring(response.content)
        news = tree.xpath(GET_CNN_NEWS_XPATH)
        news = ''.join(news)
    except Exception:
        return {}
    
    return news
