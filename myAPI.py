from flask import Flask
from flask_cors import CORS
import pymongo
from pprint import pprint
from datetime import datetime

app = Flask(__name__)

@app.route('/postData',methods = ['POST'])

MONGO_HOST = "127.0.0.1"
MONGO_PORT = 27017
MONGO_DB = "test_database"
MONGO_USER = "deva"
MONGO_PASS = "pragati@123"

CORS(app, resources={r"/*": {"origins": "*"}})

con = pymongo.MongoClient(MONGO_HOST, MONGO_PORT)
db = con[MONGO_DB]

def postData():
    return request.form

if __name__ == "__main__":
    app.run(debug=True)