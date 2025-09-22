// ✨ frontend/src/pages/Grocery.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Grocery = () => {
  const location = useLocation();
  // ✅ Get missingIngredients + recipeTitle from RecipeDetails page
  const { missingIngredients = [], recipeTitle = "" } = location.state || {};
  const [groceryData, setGroceryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroceryOptions = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:5000/get-grocery", {
          ingredients: missingIngredients,
        });
        setGroceryData(response.data);
      } catch (error) {
        console.error("Error fetching grocery options:", error);
      } finally {
        setLoading(false);
      }
    };

    if (missingIngredients.length > 0) {
      fetchGroceryOptions();
    }
  }, [missingIngredients]);

  if (loading) {
    return <div className="text-center text-lg mt-6">Loading grocery options...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🛒 Grocery Suggestions</h1>

      {groceryData.length === 0 ? (
        <p className="text-gray-600">No grocery suggestions available.</p>
      ) : (
        <div className="space-y-6">
          {groceryData.map((item, idx) => (
            <div key={idx} className="bg-white p-4 rounded-2xl shadow-md">
              {/* ✅ Show ingredient + recipe context */}
              <h2 className="text-xl font-semibold mb-3">
                Missing Ingredient:{" "}
                <span className="text-red-500">{item.ingredient}</span>{" "}
                {recipeTitle && <span className="text-gray-500">(Needed for {recipeTitle})</span>}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {item.options.map((opt, i) => (
                  <div
                    key={i}
                    className="border rounded-xl p-4 flex flex-col items-center hover:shadow-lg transition"
                  >
                    {opt.image && (
                      <img
                        src={opt.image}
                        alt={opt.shop}
                        className="w-20 h-20 object-contain mb-2"
                      />
                    )}
                    <p className="font-bold">{opt.shop}</p>
                    <p className="text-green-600 font-semibold">
                      Rs. {opt.price ?? "N/A"}
                    </p>
                    {opt.link ? (
                      <a
                        href={opt.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 text-blue-500 hover:underline"
                      >
                        View in {opt.shop}
                      </a>
                    ) : (
                      <p className="text-gray-400 mt-2">No link available</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Grocery;
