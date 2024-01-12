const IngredientInput = ({
  ingredient,
  isLoading,
  onInputChange,
  onAddIngredient,
  onKeyDown,
}) => {
  return (
    <div className="input-container">
      <input
        type="text"
        className="search-input"
        value={ingredient}
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        placeholder="Add ingredient..."
        disabled={isLoading}
      />
      <button
        className="add-ingredient-button"
        onClick={onAddIngredient}
        disabled={isLoading}
      >
        Add Ingredient
      </button>
    </div>
  );
};

export default IngredientInput;
