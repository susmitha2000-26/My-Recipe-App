
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setRecipes, setSearchQuery, setFilters } from './redux/recipesSlice';

import RecipeList from './components/RecipeList';
import FilterBar from './components/FilterBar';
import FavoritesList from './components/FavoritesList';
import RecipeDetail from './components/RecipeDetail';
import SearchBar from './components/SearchBar'; 
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import  './App.css';
function App() {
  const dispatch = useDispatch();
  const recipes = useSelector(state => state.recipes.recipes);
  const filters = useSelector(state => state.recipes.filters);
  const searchQuery = useSelector(state => state.recipes.searchQuery);

  // Mapping of category names to Spoonacular cuisine types and types like snack/dessert
  const categoryMap = {
    breakfast: 'american', // Breakfast -> American cuisine
    lunch: 'indian',
    dinner: 'italian', // Dinner -> Italian cuisine
    snack: '', // Treat snack as a search term (no specific cuisine)
    dessert: '', // Treat dessert as a search term (no specific cuisine)
  };
  

  useEffect(() => {
    console.log('Filters:', filters); // Debugging line
    const fetchRecipes = async () => {
      try {
        const mappedCategory = categoryMap[filters.category] || ''; // Default empty if no match

        const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
          params: {
            apiKey: 'ca5afc5acaf14814990fd94e67cfe9fe', // Replace with your Spoonacular API Key
            query: filters.category === 'snack' || filters.category === 'dessert' ? filters.category : searchQuery, // Use search term for snack/dessert
            cuisine: mappedCategory, // Use the mapped category here for cuisine
            diet: filters.dietary, // Dietary filter
          }
        });

        console.log('API Response:', response.data); // Debugging line

        if (response.data.results.length === 0) {
          console.log("No recipes found for this filter combination.");
        }

        dispatch(setRecipes(response.data.results)); // Dispatch to set recipes in Redux
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };


    
    fetchRecipes();
  }, [dispatch, searchQuery, filters]); // Dependencies to trigger useEffect when filters change

  
  return (
    <Router>
      <div className=" container mt-2">
        <div className="logo d-flex align-items-center justify-content-center">
      <img 
            src="recipeLogo.jpg" // Replace with your image path
            alt="logo"
            width="120"  // Adjust the size as per your preference
            height="120"
            
          />
        <h1>Recipe App</h1>
        </div>
        <nav>
        <Link to="/" className="btn btn-outline-primary me-2">Home</Link>
          <Link to="/favorites" className="btn btn-outline-danger">Favorites</Link>
          
        </nav>
        <SearchBar />
        <Routes>
        
          <Route path="/" element={
            <>
              <FilterBar />
              <RecipeList recipes={recipes} />
            </>
          } />
          <Route path="/favorites" element={<FavoritesList />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 



    

        

       