import tweepy
import json
from kafka import KafkaProducer
from kafka.errors import KafkaError
import emoji

def extract_emoji(text: str):
    return ''.join(c for c in text if c in emoji.UNICODE_EMOJI['en'])

#override tweepy.StreamListener to add logic to on_status
class TwitterKafkaMonitor(tweepy.StreamingClient):
    
    def setup_kafka_producer(self, bootstrap_servers: str, topic: str) -> None:
        print('Setting up kafka producer')
        self.topic = topic
        self.producer = KafkaProducer(bootstrap_servers=bootstrap_servers)
        print('Producer created')

    def on_tweet(self, tweet):
        if '#thelastofus' in tweet.text:
            emojis = extract_emoji(tweet.text)
            future = self.producer.send(self.topic, value=tweet.text.encode("utf-8"))

            try:
                record_metadata = future.get(timeout=10)
                print(f'Sent tweet {tweet.text} to topic {self.topic}' )
            except KafkaError as e:
                print("Failed to send tweet to topic %s: %s" % (self.topic, e))

