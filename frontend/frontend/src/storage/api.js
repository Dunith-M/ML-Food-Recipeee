// src/storage/api.js
import axios from "axios";

export const fetchRecipes = (ingredients) => {
  return axios.post("http://127.0.0.1:5000/get-recipes", {
    ingredients,
  });
};

// ✨ Fetch full recipe details + compare with fridge items
export const fetchRecipeById = (id, fridgeItems) => {
  return axios.post(`http://127.0.0.1:5000/get-recipe/${id}`, {
    fridge: fridgeItems,
  });
};


// ✨ New: Upload image to backend for ingredient detection
export const uploadFridgeImage = (file) => {
  const formData = new FormData(); //  Create a FormData object
  formData.append("file", file); //  Attach image file to request

  return axios.post("http://127.0.0.1:5000/upload-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data", //  Important for file uploads
    },
  });
};