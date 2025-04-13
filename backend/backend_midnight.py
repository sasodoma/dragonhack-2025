from flask import Flask, request, jsonify
from flask_cors import CORS
from midnight_sdk import MidnightClient
import os

app = Flask(__name__)
CORS(app)

# Initialize Midnight client
midnight = MidnightClient(
    api_key=os.getenv('MIDNIGHT_API_KEY'),
    contract_address=os.getenv('CONTRACT_ADDRESS')
)

@app.route("/submit-answer", methods=["POST"])
def submit_answer():
    data = request.json
    user_id = data.get("userId")
    letter = data.get("letter", "").lower()
    braille_input = data.get("braille")

    if not all([user_id, letter, braille_input]):
        return jsonify({"error": "Invalid input"}), 400

    try:
        is_correct = midnight.submit_answer(user_id, letter, braille_input)
        return jsonify({"correct": is_correct})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/get-challenge/<int:challenge_id>", methods=["GET"])
def get_challenge(challenge_id):
    try:
        challenge = midnight.get_challenge(challenge_id)
        if not challenge:
            return jsonify({"error": "Challenge not found"}), 404
        return jsonify(challenge)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/get-all-challenges", methods=["GET"])
def get_all_challenges():
    try:
        challenges = midnight.get_all_challenges()
        return jsonify(challenges)
    except Exception as e:
        return jsonify({"error": str(e)}), 500