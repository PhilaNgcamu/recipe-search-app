import {
  isRecipesModalOpen,
  noRecipesFound,
  setRecipesWithDetails,
  showError,
  showLoader,
} from "../actions";

const searchRecipes = (url) => {
  return async (dispatch) => {
    try {
      dispatch(showLoader(true));

      const response = await fetch(url, {
        method: "GET",
      });

      const data = await response.json();

      const recipesWithDetails = data.hits.map((hit) => ({
        name: hit.recipe.label,
        ingredients: hit.recipe.ingredientLines,
        picture: hit.recipe.image,
        linkToRecipe: hit.recipe.shareAs,
      }));

      if (!recipesWithDetails.length) {
        dispatch(noRecipesFound());
      }

      dispatch(setRecipesWithDetails(recipesWithDetails));
    } catch (error) {
      dispatch(
        showError(
          `${error.message} recipes. Please check your API credentials or your network connection`
        )
      );
    } finally {
      dispatch(isRecipesModalOpen(true));
      dispatch(showLoader(false));
    }
  };
};

export default searchRecipes;
