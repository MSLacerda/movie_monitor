import os
from modules.tweetmonitor import TwitterKafkaMonitor
from tweepy import StreamRule

TWITTER_API_KEY = os.getenv('TWITTER_API_KEY')

def main():
    monitor = TwitterKafkaMonitor(TWITTER_API_KEY)

    monitor.setup_kafka_producer(bootstrap_servers='localhost:9092', topic='tweet_monitor')
    tag_rule = StreamRule(value='#thelastofus')
    monitor.add_rules(tag_rule)
    monitor.filter(tweet_fields=["text"])


if __name__ == "__main__":
    main()
