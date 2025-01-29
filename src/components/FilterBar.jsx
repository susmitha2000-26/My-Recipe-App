// src/components/FilterBar.js

import { useDispatch } from 'react-redux';
import { setFilters } from '../redux/recipesSlice';

function FilterBar() {
  const dispatch = useDispatch();

  // Update category filter
  const handleCategoryChange = (e) => {
    dispatch(setFilters({ category: e.target.value }));
  };

  // Update dietary filter
  const handleDietaryChange = (e) => {
    dispatch(setFilters({ dietary: e.target.value }));
  };

  
  return (
    <div className="d-flex justify-content-between mb-4">
      <h3>Filter Bar</h3>
      <select onChange={handleCategoryChange} className="form-select w-25">
        <option value="">All Categories</option>
        <option value="breakfast">Breakfast</option>
        <option value="lunch">Lunch</option>
        <option value="dinner">Dinner</option>
        <option value="snack">Snack</option>
        <option value="dessert">Dessert</option>
      </select>

      <select onChange={handleDietaryChange} className="form-select w-25">
        <option value="">All Diets</option>
        <option value="vegetarian">Vegetarian</option>
        <option value="glutenFree">Gluten-Free</option>
        <option value="vegan">Vegan</option>
        <option value="paleo">Paleo</option>
        <option value="lowFodmap">Low FODMAP</option>
      </select>
      
    </div>
  );
}

export default FilterBar;
