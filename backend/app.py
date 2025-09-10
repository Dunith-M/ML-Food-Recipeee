from flask import Flask, request, jsonify
from flask_cors import CORS  # allows frontend to call backend

app = Flask(__name__)
CORS(app)  # ✨ Enable CORS for all routes

@app.route("/")
def test():
    return "Hello World"

# ✅ New API endpoint
@app.route("/get-items", methods=["POST"])
def get_items():
    data = request.get_json()  # get JSON body from request
    ingredients = data.get("ingredients", [])  # get list
    return jsonify({"received": ingredients})  # return same list

if __name__ == "__main__":
    app.run(debug=True, port=5000)
