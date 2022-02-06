from flask import Flask, request
from sklearn.model_selection import train_test_split
import pandas as pd
import xgboost as xgb
import numpy as np

app = Flask(__name__)

def get_model(crop: str):
    print('training on ' + crop)
    arr = np.loadtxt(open(f'training-data/{crop}.csv', "rb"), delimiter=",", skiprows=1)
    np.random.shuffle(arr)
    data = pd.DataFrame(arr)
    data.columns= ["Month", "Max Temperature", "Min Temperature", "Precipitation","Humidity","Solar","Temperature Avg","Condition"]
    X, y = data.iloc[:,:-1],data.iloc[:,-1]
    print(X.shape)

    X_train, _, y_train, _ = train_test_split(X,y,test_size=0.2,random_state=123)
    model = xgb.XGBClassifier()
    model.fit(X_train, y_train)
    return model

crops = ['maize']
models = {}

for crop in crops:
    models[crop] = get_model(crop)

@app.route('/predict', methods = ['POST'])
def predict():
    response = {}

    for crop in crops:
        model = models[crop]
        input_vec = np.array(request.json).reshape(1,7)
        response[crop] = list(model.predict(input_vec))[0]

    return response

@app.route("/")
def hello():
    return "Hello, World!"