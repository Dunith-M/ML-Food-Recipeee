import React from 'react'
import { Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home"
import FridgeInput from "./pages/FridgeInput"
import Recipes from "./pages/Recipes"
import Grocery from "./pages/Grocery"
import RecipeDetails from "./pages/RecipeDetails"; 
import './App.css'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      

      <nav className="bg-blue-600 p-4 text-white flex gap-6">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/fridge" className="hover:underline">Fridge Input</Link>
        <Link to="/recipes" className="hover:underline">Recipes</Link>
        <Link to="/grocery" className="hover:underline">Grocery</Link>
        
      </nav>

      
      
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fridge" element={<FridgeInput />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/grocery" element={<Grocery />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </div>
  )
}
