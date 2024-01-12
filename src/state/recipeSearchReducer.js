import types from "./types";

const initialState = {
  keyword: "",
  ingredient: "",
  ingredientsList: [],
  recipesWithDetails: [],
  loading: false,
  noRecipesFound: "",
  isModalOpen: false,
  error: null,
};

const recipeSearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_KEYWORD:
      return {
        ...state,
        keyword: action.payload,
      };

    case types.SET_INGREDIENT:
      return {
        ...state,
        ingredient: action.payload,
      };

    case types.ADD_INGREDIENT:
      return {
        ...state,
        ingredientsList: [action.payload, ...state.ingredientsList],
      };

    case types.SET_RECIPES_WITH_DETAILS:
      return {
        ...state,
        recipesWithDetails: action.payload,
      };

    case types.REMOVE_INGREDIENT:
      const updatedIngredients = [...state.ingredientsList];
      updatedIngredients.splice(action.payload, 1);
      return {
        ...state,
        ingredientsList: updatedIngredients,
      };

    case types.SHOW_LOADER:
      return {
        ...state,
        loading: action.payload,
      };

    case types.NO_RECIPES_FOUND:
      return {
        ...state,
        noRecipesFound: "No recipes found. Please try a different search",
      };

    case types.SHOW_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case types.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case types.IS_RECIPES_MODAL_OPEN:
      return {
        ...state,
        isModalOpen: action.payload,
      };

    default:
      return state;
  }
};

export default recipeSearchReducer;
