// ✨ frontend/src/pages/RecipeDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RecipeDetails = () => {
  const { id } = useParams(); // get recipe id from URL
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // later connect with backend using fetch/axios
    // temporary mock data
    const mockRecipe = {
      name: "Spaghetti Bolognese",
      ingredients: ["spaghetti", "beef", "tomato", "onion", "garlic"],
      missingIngredients: ["beef"],
      steps: [
        "Boil spaghetti.",
        "Cook beef with onion & garlic.",
        "Add tomato sauce.",
        "Mix with spaghetti and serve."
      ],
      image:
        "https://www.themealdb.com/images/media/meals/sutysw1468247559.jpg"
    };
    setRecipe(mockRecipe);
  }, [id]);

  if (!recipe) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Recipe Title */}
      <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>

      {/* Image */}
      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.name}
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



