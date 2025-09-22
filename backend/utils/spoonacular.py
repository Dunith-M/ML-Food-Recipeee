# backend/utils/spoonacular.py
import os
import random
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("SPOONACULAR_API_KEY")
BASE_URL = "https://api.spoonacular.com/food/ingredients/search"

def get_grocery_options(ingredient, number=3):
    """
    Fetch grocery options for a given ingredient.
    Combines Spoonacular validation + mock shop data.
    """
    try:
        params = {"query": ingredient, "number": 1, "apiKey": API_KEY}
        response = requests.get(BASE_URL, params=params)
        data = response.json()

        if "results" not in data or not data["results"]:
            return [{"shop": "No local option available", "price": None, "link": None}]

        # ✅ Get ingredient name + image from Spoonacular
        item = data["results"][0]
        ing_name = item.get("name")
        ing_image = f"https://spoonacular.com/cdn/ingredients_100x100/{item.get('image')}" if item.get("image") else None

        # ✅ Mock shop options
        shops = ["Keellssuper", "cargills", "Laughs"]
        options = []
        for shop in shops[:number]:
            options.append({
                "shop": shop,
                "price": random.randint(150, 500),  # mock price
                "link": f"https://{shop.lower()}.lk/search?q={ing_name.replace(' ', '+')}",
                "image": ing_image
            })

        return options
    except Exception as e:
        print("Error fetching from Spoonacular:", e)
        return [{"shop": "Error fetching data", "price": None, "link": None}]
