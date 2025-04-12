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

@app.route("/get-challenge-1", methods=["GET"])
def get_challenge_1():
    all_challenges = list(challenges.find())
    if not all_challenges:
        return jsonify({"error": "No challenges found"}), 404

    challenge = random.choice(all_challenges)
    return jsonify({
        "challenge_id": challenge["challenge_id"],
        "letters": challenge["letters"],
        "type": challenge["type"],

    })

@app.route("/get-all-challenges", methods=["GET"])
def get_all_challenges():
    all_challenges = list(challenges.find({}, {"_id": 0}))  # Exclude MongoDB _id from results
    return jsonify(all_challenges)


if __name__ == "__main__":
    app.run(debug=True)
