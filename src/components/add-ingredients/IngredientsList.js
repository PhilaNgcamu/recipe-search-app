const IngredientsList = ({ ingredientsList, onRemoveIngredient }) => {
  return (
    <ul className="ingredients-list" data-testid="ingredients-list">
      {ingredientsList.map((ingredient, index) => (
        <li key={index}>
          <div className="ingredient-list-content">{ingredient}</div>
          <button
            className="remove-ingredient-button"
            onClick={() => onRemoveIngredient(index)}
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
};

export default IngredientsList;
