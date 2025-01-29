// src/components/RecipeCard.js
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/recipesSlice';
import { Link } from 'react-router-dom';

function RecipeCard({ recipe }) {
  const dispatch = useDispatch();
  const isFavorite = useSelector(state => state.recipes.favorites.some(fav => fav.id === recipe.id));

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(recipe.id)); // Remove from favorites if already in list
    } else {
      dispatch(addFavorite(recipe)); // Add to favorites
    }
  };

  return (
    <div className="card mb-3">
      <img src={recipe.image} alt={recipe.title} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{recipe.title}</h5>
        <p className="card-text">{recipe.description}</p>
        <button 
          onClick={toggleFavorite} 
          className={`btn ${isFavorite ? 'btn-danger' : 'btn-outline-primary'}`}>
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
        <Link to={`/recipe/${recipe.id}`} className="btn btn-info ms-2">View Details</Link>
      </div>
    </div>
  );
}

export default RecipeCard;
