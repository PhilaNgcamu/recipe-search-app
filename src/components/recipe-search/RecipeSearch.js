import { useDispatch, useSelector } from "react-redux";
import searchRecipes from "../../state/thunk/searchRecipe";
import { showError } from "../../state/actions";
import AddKeywords from "../add-keywords/AddKeywords";
import RecipeList from "./RecipeList";
import ErrorMessage from "./ErrorMessage";
import LoadingModal from "../modals/LoadingModal";
import AddIngredients from "../add-ingredients/AddIngredients";
import FoundRecipesModal from "../modals/FoundRecipesModal";

const RecipeSearch = () => {
  const error = useSelector((state) => state.error);
  const isLoading = useSelector((state) => state.loading);
  const ingredientsList = useSelector((state) => state.ingredientsList);
  const keyword = useSelector((state) => state.keyword);

  const dispatch = useDispatch();

  const handleSearch = async () => {
    if (!keyword.trim() && !ingredientsList.length) {
      return dispatch(
        showError("Please enter keywords or ingredients before searching")
      );
    }

    const searchQuery = `${keyword.trim()} ${ingredientsList.join(", ")}`;

    const appId = "7898e02c";
    const appKey = "854185341d0d9477636ecd26068c8245";

    const apiUrl = `https://api.edamam.com/api/recipes/v2?q=${searchQuery.trim()}&app_id=${appId}&app_key=${appKey}&type=public`;

    dispatch(searchRecipes(apiUrl));
  };

  return (
    <div className="container">
      <h1>Recipe App</h1>
      <AddKeywords />
      <AddIngredients />
      <button
        className="search-button"
        onClick={handleSearch}
        disabled={isLoading}
      >
        Search
      </button>
      <ErrorMessage displayErrorMessage={error} />
      <RecipeList />
      <LoadingModal />
      <FoundRecipesModal />
    </div>
  );
};

export default RecipeSearch;
