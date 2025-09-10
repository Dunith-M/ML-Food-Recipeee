import React from "react";
import { useState } from "react";
import axios from "axios";

const FridgeInput = () => {
  // ✅ State to store input text
  const [ingredients, setIngredients] = useState("");
  const [response, setResponse] = useState(null); // store backend response

  // ✅ Handle button click
  const handleCheckRecipes = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:5000/get-items", {
        ingredients: ingredients.split(",").map(item => item.trim()), // array
      });
      console.log(res.data);
      setResponse(res.data); // store response to display
    } catch (err) {
      console.error(err);
      alert("Error connecting to backend");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Enter your fridge items:</h2>
      
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

      {/* ✅ Display backend response */}
      {response && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <strong>Backend received:</strong> {response.received.join(", ")}
        </div>
      )}
    </div>
  );
};

export default FridgeInput;
