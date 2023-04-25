import tweepy
from kafka import KafkaProducer, KafkaConsumer
from kafka.admin import  KafkaAdminClient, NewTopic
from kafka.errors import KafkaError


def main() -> None:
    topics = []

    server = ["localhost:9092"]
    client_id = '1001'
    api_version=(0, 10)

    # admin = KafkaAdminClient(bootstrap_servers=server, api_version=api_version, client_id=client_id)

    producer = KafkaProducer(bootstrap_servers=server)
    consumer = KafkaConsumer(bootstrap_servers=server)

    print(consumer.topics())

    print('create topic')

#     tweettopic = NewTopic('tweet_topic')

#     topics.append(tweettopic)
# #
#     admin.create_topics(new_topics=topics)

#     print('Producer created')
    future = producer.send('tweet_monitor', value='testing the topic'.encode("utf-8"))
    record_metadata = future.get(timeout=20)

if __name__ == '__main__':
    main()