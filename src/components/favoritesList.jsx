// src/components/FavoritesList.js
import { useSelector } from 'react-redux';
import RecipeCard from './RecipeCard';

function FavoritesList() {
  const favorites = useSelector(state => state.recipes.favorites);

  return (
    <div className="container mt-5">
      <h2>Your Favorite Recipes</h2>
      <div className="row">
        {favorites.length > 0 ? (
          favorites.map((recipe) => (
            <div className="col-md-4" key={recipe.id}>
              <RecipeCard recipe={recipe} />
            </div>
          ))
        ) : (
          <p>You have no favorite recipes yet.</p>
        )}
      </div>
    </div>
  );
}

export default FavoritesList;
