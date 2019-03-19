from flask import Flask, jsonify, request
from flask_cors import CORS
import pymongo
from pprint import pprint
from datetime import datetime

def getListFromCollection(mylist):
    stringList = list(map(lambda x: x["time"],mylist))
    return stringList

def getHolidayFromCollection(mylist):
    holidayList = list(map(lambda x: x["Date"],mylist))
    return holidayList

app = Flask(__name__)
CORS(app)
MONGO_HOST = "192.168.137.24"
MONGO_PORT = 27017
MONGO_DB = "test_database"
MONGO_USER = "deva"
MONGO_PASS = "pragati@123"

CORS(app, resources={r"/*": {"origins": "*"}})

con = pymongo.MongoClient(MONGO_HOST, MONGO_PORT)
db = con[MONGO_DB]
db.authenticate(MONGO_USER, MONGO_PASS)

currentSchedule = db.currentSchedule
alertTime = db.alertTime
logDetails = db.alertBellLog
holidayData = db.holidayData
defaultSchedule = db.defaultSchedule

@app.route("/currentSchedule",methods = ['GET'])
def getCurrentSchedule():
    output = []
    for entry in currentSchedule.find():
        output.append({ "time": entry['time']})
    return jsonify({"result": output})

@app.route("/logDetails",methods = ['GET'])
def getLogDetails():
    output = []
    for entry in logDetails.find():
        output.append({ "time": entry['time'], "reason":entry['reason']})
    return jsonify({"result": output})

@app.route("/holidayList", methods = ['GET'])
def getHolidays():
    output = []
    for entry in holidayData.find():
        output.append({"date": entry['Date']})
    return jsonify({"result": output})

@app.route("/RestoreDefaults", methods = ['GET'])
def restoreDefaults():
    print('hi')
    alertTime.drop()
    currentSchedule.drop()
    for entry in defaultSchedule.find():
        currentSchedule.insert({"time": entry['time']})
        # output.append({"time": entry['time']})
    print('bye')
    return 'hi'
 

@app.route("/postData",methods = ['POST'])
def postData():
    data = request.form
    currentScheduleList = getListFromCollection(list(currentSchedule.find({},{ "time":1,"_id": 0})))
    if data["time"] in currentScheduleList:
        print("Time already exist")
        result = {"myStatus":"Time already present in currentSchedule"}
        return jsonify(result)
    else:
        myresult = {"time": data["time"], "reason": data["reason"], "isChecked": False, "duration":data["duration"], "myStatus":"Succesfully updated in database"}
        result = myresult.copy()
        print(myresult)
        alertTime.insert_one(myresult)
        print(jsonify(result))
        return jsonify(result)
    

@app.route("/addHoliday", methods=['POST'])
def addHoliday():
    data = request.form
    holidayList = getHolidayFromCollection(list(holidayData.find({},{ "Date":1,"_id": 0})))
    if data["date"] in holidayList:
        print("Date already present in holiday list")
        result = {"myStatus" : "Date already present in holiday list"}
        return jsonify(result)
    else:
        myresult = {'Date': data['date'],'myStatus':"Successfully updated in holiday list"}
        result = myresult.copy()
        print(myresult)
        holidayData.insert_one(myresult)
        return jsonify(result)

@app.route('/deleteHoliday',methods=['POST'])
def deleteHoliday():
    data = request.form
    myresult = {'Date':data['date']}
    result = myresult.copy()
    holidayData.remove(myresult)
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)