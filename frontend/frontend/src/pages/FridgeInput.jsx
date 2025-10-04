//  frontend/src/pages/FridgeInput.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadFridgeImage } from "../storage/api";

const FridgeInput = () => {
  const [ingredients, setIngredients] = useState(""); //  Manual typing
  const [image, setImage] = useState(null); //  Store uploaded image
  const [preview, setPreview] = useState(null); //  For showing preview
  const [loading, setLoading] = useState(false); //  track upload state
  const navigate = useNavigate();

  // Handle manual typing
  const handleCheckRecipes = () => {
    if (!ingredients.trim()) {
      alert("Please enter some ingredients!");
      return;
    }
    const ingredientsArray = ingredients
      .split(",")
      .map((item) => item.trim());

    // Save to localStorage
    localStorage.setItem("fridge_ingredients", JSON.stringify(ingredientsArray));

    // Navigate to Recipes page
    navigate("/recipes");
  };

  // Handle file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Create preview
    } else {
      alert("Please upload a valid JPG or PNG image.");
    }
  };

  

   //  Handle image upload to backend
  const handleDetectIngredients = async () => {
    if (!image) {
      alert("Please upload an image first!");
      return;
    }

    try {
      setLoading(true); //  Show loading state
      const response = await uploadFridgeImage(image); //  Upload to backend

      if (response.data.success) {
        alert(`✅ ${response.data.message}\nFile: ${response.data.filename}`);
        //  You can later trigger YOLO detection or auto-fetch recipes here
      } else {
        alert(`⚠️ Upload failed: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Image upload error:", error);
      alert("❌ Error uploading image. Please try again.");
    } finally {
      setLoading(false); //  Reset loading state
    }
  };


  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Enter your fridge items 🧊</h2>

      {/* Manual input option */}
      <input
        type="text"
        placeholder="e.g., carrot, rice, chicken"
        className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />

      <button
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mb-6"
        onClick={handleCheckRecipes}
      >
        Check Recipes
      </button>

      {/* Divider */}
      <div className="text-center text-gray-500 my-4">OR</div>

      {/* Image upload option */}
      <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center">
        <p className="mb-2 text-gray-600">Upload a photo of your fridge items 📷</p>
        <input
          type="file"
          accept="image/png, image/jpeg"
          className="hidden"
          id="fridge-upload"
          onChange={handleFileChange}
        />
        <label
          htmlFor="fridge-upload"
          className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded text-sm text-gray-700"
        >
          Choose File
        </label>

        {/* Image preview */}
        {preview && (
          <div className="mt-4">
            <img
              src={preview}
              alt="Fridge Preview"
              className="mx-auto max-h-48 rounded border"
            />
          </div>
        )}
      </div>

      {/* Detect Ingredients Button */}
      <button
        className="w-full mt-6 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        onClick={handleDetectIngredients}
      >
        Detect Ingredients
      </button>
    </div>
  );
};

export default FridgeInput;
