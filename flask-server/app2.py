from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

import pandas as pd
import numpy as np
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder

from sklearn.model_selection import train_test_split
from xgboost import XGBClassifier
def compr(x):
    if x==">50K":return 1;
    return 0
  

#Import Data and drop rows with missing labels

data=pd.read_csv("census.csv")

cat_features=[
              "education_level","workclass","marital-status","occupation",
              "relationship","race","sex","native-country"
             ]
cat_transformer=Pipeline(steps=[
    ("imputer",SimpleImputer(strategy="constant",fill_value="missing")),
    ("onehot",OneHotEncoder(handle_unknown="ignore"))
])
num_features=["age","education-num","capital-gain","capital-loss","hours-per-week"]
num_transformer=Pipeline(steps=[
    ("imputer",SimpleImputer(strategy="mean"))
])

#SetUp preprocessing steps

preprocessor=ColumnTransformer(transformers=[
    ("cat",cat_transformer,cat_features),
    ("num",num_transformer,num_features),
])

#Creating a preprocessing and modelling Pipeline

model=Pipeline(steps=[("preprocessing",preprocessor),
                      ("model",XGBClassifier())
                     ])
x=data.drop("income",axis=1)
y=data["income"]
y=y.apply(compr)
x_train,x_test,y_train,y_test=train_test_split(x,y,test_size=0.4)
model.fit(x_train,y_train)
model.score(x_test,y_test)


def predict(data):
    df=pd.DataFrame(data)
    pred=model.predict(df);
    return pred


app = Flask(__name__)
cors = CORS(app)

@app.route('/api/post-data', methods=['POST'])
def post_data():
    try:
        data = request.json['data']    
        return str(predict(data)[0])
    except Exception as e:
        print(str(e))
        return jsonify({'error': str(e)})
    

if __name__ == '__main__':
    app.run(port=8001)