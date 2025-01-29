import React from 'react';
import { useSelector } from 'react-redux';
import RecipeCard from './RecipeCard';

function RecipeList() {
  // Default to an empty array if recipes is undefined
  const recipes = useSelector(state => state.recipes.recipes) || [];

  return (
    <div className="recipe-list row">
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <div className="col-md-4" key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </div>
        ))
      ) : (
        <p>No recipes found.</p>
      )}
    </div>
  );
}

export default RecipeList;
