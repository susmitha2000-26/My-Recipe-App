import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
          params: {
            apiKey: 'ca5afc5acaf14814990fd94e67cfe9fe', // Replace with your Spoonacular API Key
          }
        });
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} className="img-fluid" />
      <h3>Ingredients:</h3>
      <ul>
        {recipe.extendedIngredients.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.original}</li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <p>{recipe.instructions}</p>
    </div>
  );
}

export default RecipeDetail;
