const RecipeCard = ({ recipe }) => {
  const { name, picture, ingredients, linkToRecipe } = recipe;

  return (
    <div className="recipe-card">
      <img src={picture} alt={name} className="recipe-picture" />
      <h3>{name}</h3>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <a
        href={linkToRecipe}
        target="_blank"
        rel="noopener noreferrer"
        className="view-recipe-button"
      >
        View Recipe
      </a>
    </div>
  );
};

export default RecipeCard;
