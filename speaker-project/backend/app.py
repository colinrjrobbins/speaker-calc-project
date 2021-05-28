from flask import Flask, jsonify, require

app = Flask(__name__)

@app.route('/simpleCalc')
def simpleCalc():
    number_returned = 12
    return jsonify({"number": str(number_returned)})