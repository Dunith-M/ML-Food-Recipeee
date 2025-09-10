// ✨ frontend/src/pages/Recipes.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRecipes } from "../storage/api";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("fridge_ingredients");
    if (!stored) {
      navigate("/fridge-input");
      return;
    }
    const ingredients = JSON.parse(stored);

    const loadRecipes = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchRecipes(ingredients);
        setRecipes(res.data || []);
      } catch (err) {
        setError(err.response?.data?.error || err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, [navigate]);

  if (loading) return <div className="p-6">Loading recipes... 🍳</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error} ❌</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Recipe Suggestions 🍽️</h1>

      {recipes.length === 0 ? (
        <div className="text-gray-600">
          No recipes found for your ingredients.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recipes.map((r) => (
            <div key={r.id} className="border rounded-lg p-4 shadow-sm">
              {r.image ? (
                <img
                  src={r.image}
                  alt={r.title}
                  className="w-full h-40 object-cover rounded mb-3"
                />
              ) : (
                <div className="w-full h-40 bg-gray-100 rounded mb-3 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}

              <h2 className="text-lg font-semibold">{r.title}</h2>
              <p className="text-sm text-gray-600 mt-1">
                ✅ Have: {r.usedIngredients.join(", ") || "—"}
              </p>
              <p className="text-sm text-red-600 mt-1">
                ❌ Missing: {r.missedIngredients.join(", ") || "None"}
              </p>

              <div className="mt-3 flex justify-end">
                <button
                  onClick={() =>
                    window.open(
                      `https://spoonacular.com/recipes/${r.title
                        .replace(/\s+/g, "-")
                        .toLowerCase()}-${r.id}`,
                      "_blank"
                    )
                  }
                  className="px-3 py-1 bg-green-600 text-white rounded"
                >
                  View Recipe
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recipes;
