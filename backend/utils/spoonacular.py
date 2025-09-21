# backend/utils/spoonacular.py
import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("SPOONACULAR_API_KEY")
BASE_URL = "https://api.spoonacular.com/food/ingredients/search"

def get_grocery_options(ingredient, number=3):
    """
    Fetch grocery options for a given ingredient from Spoonacular.
    Returns a list of dictionaries: [{name, price (mock), link}, ...]
    """
    try:
        params = {
            "query": ingredient,
            "number": number,
            "apiKey": API_KEY
        }
        response = requests.get(BASE_URL, params=params)
        data = response.json()
        results = []

        if "results" in data:
            for item in data["results"]:
                results.append({
                    "name": item.get("name"),
                    "price": round(item.get("estimatedCost", {}).get("value", 100) * 100),  # mock price
                    "link": f"https://spoonacular.com/ingredients/{item.get('name').replace(' ', '-')}-ingredient"  # example link
                })
        else:
            results.append({"name": ingredient, "price": None, "link": None})

        return results
    except Exception as e:
        print("Error fetching from Spoonacular:", e)
        return [{"name": ingredient, "price": None, "link": None}]
