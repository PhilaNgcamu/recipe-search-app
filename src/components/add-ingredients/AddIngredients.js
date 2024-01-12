import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setIngredient,
  addIngredient,
  removeIngredient,
  showError,
  clearError,
} from "../../state/actions";
import IngredientInput from "./IngredientInput";
import IngredientsList from "./IngredientsList";

const AddIngredients = () => {
  const dispatch = useDispatch();
  const ingredient = useSelector((state) => state.ingredient);
  const ingredientsList = useSelector((state) => state.ingredientsList);
  const displayErrorMessage = useSelector((state) => state.error);
  const isLoading = useSelector((state) => state.loading);

  const handleIngredientChange = (event) => {
    dispatch(setIngredient(event.target.value));
  };

  const handleAddIngredient = async () => {
    const trimmedIngredient = ingredient.trim();

    if (!trimmedIngredient) {
      return dispatch(showError("Please enter an ingredient before adding"));
    }

    if (ingredientsList.includes(trimmedIngredient)) {
      return dispatch(showError("Ingredient already added"));
    }

    dispatch(addIngredient(trimmedIngredient));
    dispatch(setIngredient(""));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAddIngredient();
    }
  };

  const handleRemoveIngredient = (index) => {
    dispatch(removeIngredient(index));
  };

  useEffect(() => {
    if (
      displayErrorMessage !==
      "Failed to fetch recipes. Please check your API credentials or your network connection"
    ) {
      const timeoutId = setTimeout(() => {
        dispatch(clearError());
      }, 3700);
      return () => clearTimeout(timeoutId);
    }
  }, [displayErrorMessage, dispatch]);

  return (
    <div>
      <div className="section-title">Ingredients</div>
      <IngredientInput
        ingredient={ingredient}
        isLoading={isLoading}
        onInputChange={handleIngredientChange}
        onAddIngredient={handleAddIngredient}
        onKeyDown={handleKeyDown}
      />
      <IngredientsList
        ingredientsList={ingredientsList}
        onRemoveIngredient={handleRemoveIngredient}
      />
    </div>
  );
};

export default AddIngredients;
