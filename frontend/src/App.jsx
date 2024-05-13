import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Hero from "./pages/Hero";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Recipes from "./pages/Recipes";
import RecipesDetails from "./pages/RecipeDetails";
import AddRecipe from "./pages/AddRecipe";
import { Navbar } from "./components/layout/navbar";
import Layout from "./pages/Layout";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Hero />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipe-details" element={<RecipesDetails />} />
          <Route path="/create-recipe" element={<AddRecipe />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
