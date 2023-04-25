from pyspark.sql import SparkSession
from pyspark.sql.functions import from_json
from pyspark.sql.types import StructType, StructField, StringType
import json
import re
import websocket
import threading

ws_url = 'ws://localhost:5050'

# Function to send data through the websocket
def send_data(data):
    ws = websocket.WebSocket()
    ws.connect(ws_url)
    ws.send(json.dumps(data))
    ws.close()


# Function to count the number of occurrences of each emoji in a text
def count_emojis(text):
    emoji_pattern = re.compile("["
        u"\U0001F600-\U0001F64F"  # emoticons
        u"\U0001F300-\U0001F5FF"  # symbols & pictographs
        u"\U0001F680-\U0001F6FF"  # transport & map symbols
        u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
                           "]+", flags=re.UNICODE)
    emojis = emoji_pattern.findall(text)
    emoji_dict = {}
    for emoji in emojis:
        if emoji in emoji_dict:
            emoji_dict[emoji] += 1
        else:
            emoji_dict[emoji] = 1
    return emoji_dict

def main():
    # Create a Spark session
    spark = SparkSession.builder.appName("TwitterKafkaReader").getOrCreate()

    # Define the schema for the incoming tweets
    tweet_schema = StructType([
        StructField("text", StringType(), True)
    ])

    # Read the tweets from the Kafka topic into a DataFrame
    tweets = spark \
        .readStream \
        .format("kafka") \
        .option("kafka.bootstrap.servers", "localhost:9092") \
        .option("subscribe", "tweet_monitor") \
        .load() \
        .selectExpr("CAST(value AS STRING)") \
        .select(from_json("value", tweet_schema).alias("tweet")) \
        .select("tweet.*") \

    # Start the stream and show the tweets
    query = tweets \
        .writeStream \
        .outputMode("append") \
        .format("console") \
        .start()

    query.awaitTermination(5)

    tweets.show(5)

if __name__ == "__main__":
    main()