// ✨ frontend/src/pages/FridgeInput.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FridgeInput = () => {
  const [ingredients, setIngredients] = useState("");
  const navigate = useNavigate();

  const handleCheckRecipes = () => {
    if (!ingredients.trim()) {
      alert("Please enter some ingredients!");
      return;
    }
    const ingredientsArray = ingredients
      .split(",")
      .map((item) => item.trim());
    
    // Save ingredients to localStorage to pass to Recipes page
    localStorage.setItem(
      "fridge_ingredients",
      JSON.stringify(ingredientsArray)
    );

    // Navigate to Recipes page
    navigate("/recipes");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Enter your fridge items 🧊</h2>

      <input
        type="text"
        placeholder="e.g., carrot, rice, chicken"
        className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />

      <button
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        onClick={handleCheckRecipes}
      >
        Check Recipes
      </button>
    </div>
  );
};

export default FridgeInput;
