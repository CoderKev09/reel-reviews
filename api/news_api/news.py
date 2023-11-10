import requests


def get_news():
    url = "https://newsapi.org/v2/everything?q=movie&apiKey=fc0d573f0a614d6fb91b787511e43fcf"

    response = requests.get(url)
    data = response.json()

    # if response.status_code == 200:
    #     latest_news = []
    #     for source in data["sources"]:
    #         news = {
    #             source["name"],
    #             source["description"],
    #         }
    #         latest_news.append(news)
    return data
