import axios from "axios";

export const fetchRecipes = (ingredients) => {
  return axios.post("http://127.0.0.1:5000/get-recipes", {
    ingredients,
  });
};