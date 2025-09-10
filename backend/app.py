from flask import Flask, request, jsonify
from flask_cors import CORS  # allows frontend to call backend
import requests
import os
from dotenv import load_dotenv  


app = Flask(__name__)
CORS(app)  # ✨ Enable CORS for all routes
load_dotenv()
# Load Spoonacular API key from environment variable
API_KEY = os.environ.get("SPOONACULAR_API_KEY")  

@app.route("/")
def test():
    return "Hello World"

# ✅ Existing test endpoint
@app.route("/get-items", methods=["POST"])
def get_items():
    data = request.get_json()  # get JSON body from request
    ingredients = data.get("ingredients", [])  # get list
    return jsonify({"received": ingredients})  # return same list

# ✅ New Spoonacular recipe endpoint
@app.route("/get-recipes", methods=["POST"])
def get_recipes():
    data = request.get_json()
    ingredients = data.get("ingredients", [])
    if not ingredients:
        return jsonify({"error": "No ingredients provided"}), 400

    ingredients_str = ",".join(ingredients)  # convert list to comma-separated string

    # Call Spoonacular API
    url = "https://api.spoonacular.com/recipes/findByIngredients"
    params = {
        "ingredients": ingredients_str,
        "number": 10,          # max 10 recipes
        "ranking": 1,          # prioritize recipes using more of your ingredients
        "apiKey": API_KEY
    }

    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        recipes = response.json()
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

    # Simplify response for frontend
    results = []
    for r in recipes:
        results.append({
            "id": r['id'],
            "title": r['title'],
            "image": r.get('image'),
            "usedIngredients": [i['name'] for i in r.get('usedIngredients', [])],
            "missedIngredients": [i['name'] for i in r.get('missedIngredients', [])],
        })

    return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
