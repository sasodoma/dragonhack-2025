from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import random

app = Flask(__name__)
CORS(app) 

uri = "mongodb+srv://dh2025piskotki:1eDlIH4gnOm9irud@cluster0.2tv5i3a.mongodb.net/?retryWrites=true&w=majority&tls=true"
client = MongoClient(uri, server_api=ServerApi('1'))
db = client["braille_learning_app"]
challenges = db["challenges"]
braille_codes = db["braille_codes"]

@app.route("/submit-answer", methods=["POST"])
def submit_answer():
    data = request.json
    letter = data.get("letter", "").lower()
    braille_input = data.get("braille")

    if not letter or not isinstance(braille_input, list):
        return jsonify({"error": "Invalid input"}), 400

    letter_doc = braille_codes.find_one({"letter": letter})
    if not letter_doc:
        return jsonify({"error": "Letter not found in database"}), 404

    is_correct = letter_doc["braille"] == braille_input
    return jsonify({"correct": is_correct})

@app.route("/get-challenge/<int:challenge_id>", methods=["GET"])
def get_challenge(challenge_id):
    challenge = challenges.find_one({"challenge_id": challenge_id})
    if not challenge:
        return jsonify({"error": "Challenge not found"}), 404

    return jsonify({
        "challenge_id": challenge["challenge_id"],
        "letters": challenge["letters"],
        "type": challenge["type"],
    })

@app.route("/get-all-challenges", methods=["GET"])
def get_all_challenges():
    all_challenges = list(challenges.find({}, {"_id": 0}))  # Exclude MongoDB _id from results
    return jsonify(all_challenges)

@app.route("/get-user", methods=["GET"])
def get_user():
    username = request.args.get("username")
    if not username:
        return jsonify({"error": "Username not provided"}), 400

    user = db["users"].find_one({"username": username}, {"_id": 0})
    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify(user)



if __name__ == "__main__":
    app.run(debug=True)
