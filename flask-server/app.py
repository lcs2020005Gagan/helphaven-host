from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

import re
import pickle
import numpy as np
import pandas as pd
import nltk
nltk.download('omw-1.4')
nltk.download('wordnet')
nltk.download('punkt')
nltk.download('stopwords')
# plotting
# sklearn

from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

from nltk import word_tokenize
from sklearn.feature_extraction.text import CountVectorizer #Data transformation


data=pd.read_csv("labeled_data.csv")
data["hate_speech"]=data["hate_speech"]+data["offensive_language"]
data["class"]=data.hate_speech<data.neither
data.drop(["Unnamed: 0","count","hate_speech","offensive_language","neither"],axis=1,inplace=True)
data.columns=["sentiment","text"]

def preprocess(data):
    #Text transformation
    data["text"]=data.text.str.lower() #lowercase
    data.text=[str(data) for data in data.text] #converting all to string
    data.text=data.text.apply(lambda x: re.sub('[^A-Za-z0-9 ]+', ' ', x)) #regex
    return data.text



def process_sentiment(s):
    if s:return 1;
    return 0;

data["sentiment"]=data["sentiment"].apply(process_sentiment)

processed_data=preprocess(data);

#Text splitting
tokens_text = [word_tokenize(str(word)) for word in processed_data]

#Unique word counter
tokens_counter = [item for sublist in tokens_text for item in sublist]

stopwords_nltk = nltk.corpus.stopwords
stop_words = stopwords_nltk.words('english')


#Initial Bag of Words
bow_counts = CountVectorizer(
    tokenizer=word_tokenize,
    stop_words=stop_words, #English Stopwords
    ngram_range=(1, 2) #analysis of one word
)
text=processed_data
sentiment=data.sentiment
X_train, X_test, y_train, y_test = train_test_split(text, sentiment, test_size = 0.2)

#Creation of encoding related to train dataset
X_train_bow = bow_counts.fit_transform(X_train)
#Transformation of test dataset with train encoding
X_test_bow = bow_counts.transform(X_test)

LRmodel = LogisticRegression(C = 2, max_iter = 1000, n_jobs=-1)
LRmodel.fit(X_train_bow, y_train)

def predict(bow_counts,model, data):
    print("pred")
    data=preprocess(data)
    # Predict the sentiment
    X = bow_counts.transform(data)
    sentiment = model.predict(X)
    print(sentiment)
    return sentiment

#data.head()
  
app = Flask(__name__)
cors = CORS(app)

@app.route('/')
def index():
    return jsonify(message='Hello, World!')

@app.route('/api/data', methods=['POST'])
def receive_data():
    data = request.get_json()
    # do something with the data array
    return jsonify({'message': data})

@app.route('/api/post-data', methods=['POST'])
def post_data():
    try:
        data = request.json['data']         
        df=pd.DataFrame([data],columns=["text"])
        return (str(predict(bow_counts,LRmodel, df)[0]))
    except Exception as e:
        print(str(e))
        return jsonify({'error': str(e)})
    

if __name__ == '__main__':
    app.run(port=8000)