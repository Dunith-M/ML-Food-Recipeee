import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // ✨ Added for API calls

const RecipeDetails = () => {
  const { id } = useParams(); // get recipe id from URL
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false); // ✨ Added loading state
  const [error, setError] = useState(null); // ✨ Added error state

  useEffect(() => {
    const loadRecipe = async () => {
      setLoading(true);
      setError(null);

      try {
        // ❌ Removed mock data
        // ✅ Added real API call to backend
        const fridgeItems = JSON.parse(localStorage.getItem("fridge_ingredients")) || [];
        const res = await axios.post(`http://127.0.0.1:5000/get-recipe/${id}`, {
          fridge: fridgeItems,
        });
        setRecipe(res.data);
      } catch (err) {
        setError(err.response?.data?.error || err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    loadRecipe();
  }, [id]);

  if (loading) return <p className="text-center">Loading recipe... 🍳</p>;
  if (error) return <p className="text-center text-red-600">Error: {error} ❌</p>;
  if (!recipe) return <p className="text-center">No recipe found ❌</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Recipe Title */}
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1> {/* ✨ Changed from recipe.name to recipe.title */}

      {/* Image */}
      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover rounded-lg shadow mb-6"
        />
      )}

      {/* Ingredients */}
      <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
      <ul className="mb-6 list-disc list-inside">
        {recipe.ingredients.map((ing, i) => (
          <li
            key={i}
            className={
              recipe.missingIngredients.includes(ing) // ✨ use missingIngredients from backend
                ? "text-red-600 font-bold"
                : "text-gray-800"
            }
          >
            {ing}
          </li>
        ))}
      </ul>

      {/* Steps */}
      <h2 className="text-xl font-semibold mb-2">Steps</h2>
      <ol className="list-decimal list-inside space-y-2">
        {recipe.steps.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
    </div>
  );
};

export default RecipeDetails;

