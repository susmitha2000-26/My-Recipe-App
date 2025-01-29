// redux/recipesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  recipes: [],
  searchQuery: '',
  filters: {
    category: '',
    dietary: ''
  },
  favorites: JSON.parse(localStorage.getItem('favorites')) || [],
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setRecipes: (state, action) => {
      state.recipes = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload; // Update the searchQuery
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    addFavorite: (state, action) => {
      const recipe = action.payload;
      if (!state.favorites.find(item => item.id === recipe.id)) {
        state.favorites.push(recipe);
        localStorage.setItem('favorites', JSON.stringify(state.favorites));
      }
    },
    removeFavorite: (state, action) => {
      const recipeId = action.payload;
      state.favorites = state.favorites.filter(recipe => recipe.id !== recipeId);
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
  },
});

export const { setRecipes, setSearchQuery, setFilters, addFavorite, removeFavorite } = recipesSlice.actions;

export default recipesSlice.reducer;
