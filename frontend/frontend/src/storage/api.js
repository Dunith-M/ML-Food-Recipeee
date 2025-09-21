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
