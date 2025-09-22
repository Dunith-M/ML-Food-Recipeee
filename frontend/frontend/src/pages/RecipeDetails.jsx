// ✨ frontend/src/pages/RecipeDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"; // ✨ Added axios import for API call

const RecipeDetails = () => {
  const { id } = useParams(); // get recipe id from URL
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false); // ✨ loading state
  const [error, setError] = useState(null); // ✨ error state

  const navigate = useNavigate();

  useEffect(() => {
    const loadRecipe = async () => {
      setLoading(true);
      setError(null);

      try {
        // Get fridge items from localStorage
        const fridgeItems =
          JSON.parse(localStorage.getItem("fridge_ingredients")) || [];

        // Call backend to get recipe details + missing/available ingredients
        const res = await axios.post(`http://127.0.0.1:5000/get-recipe/${id}`, {
          fridge: fridgeItems, // ✨ sending user's fridge items
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
  if (error)
    return <p className="text-center text-red-600">Error: {error} ❌</p>;
  if (!recipe) return <p className="text-center">No recipe found ❌</p>;

  // ✨ Prepare missing ingredients display
  const missingDisplay =
    recipe.missingIngredients.length === 0
      ? "You have everything for this recipe! ✅"
      : recipe.missingIngredients.length > 20
      ? `${recipe.missingIngredients.slice(0, 20).join(", ")} and ${
          recipe.missingIngredients.length - 20
        } more...`
      : recipe.missingIngredients.join(", ");
  // ✨ Function to handle navigating to Grocery Suggestions Page
  const handleViewGrocery = () => {
    navigate("/grocery", {
      state: { missingIngredients: recipe.missingIngredients },
    });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Recipe Title */}
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>

      {/* Image */}
      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover rounded-lg shadow mb-6"
        />
      )}

      {/* ✨ New Section: Missing Ingredients */}
      <div className="mb-4 p-4 border rounded bg-red-50">
        <span className="font-semibold">You are missing: </span>
        <span className="text-red-600 font-bold">{missingDisplay}</span>
      </div>

      {recipe.missingIngredients.length > 0 && (
        <button
          onClick={handleViewGrocery}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600"
        >
          View Grocery Suggestions
        </button>
      )}

      {/* Optional: Available Ingredients */}
      {recipe.availableIngredients &&
        recipe.availableIngredients.length > 0 && (
          <div className="mb-6 p-4 border rounded bg-green-50">
            <span className="font-semibold">You have: </span>
            <span className="text-green-600 font-bold">
              {recipe.availableIngredients.join(", ")}
            </span>
          </div>
        )}

      {/* Ingredients List */}
      <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
      <ul className="mb-6 list-disc list-inside">
        {recipe.ingredients.map((ing, i) => (
          <li
            key={i}
            className={
              recipe.missingIngredients.includes(ing)
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
