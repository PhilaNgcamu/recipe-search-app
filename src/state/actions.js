import types from "./types";

export const setKeyword = (keyword) => ({
  type: types.SET_KEYWORD,
  payload: keyword,
});

export const setIngredient = (ingredient) => ({
  type: types.SET_INGREDIENT,
  payload: ingredient,
});

export const addIngredient = (ingredient) => ({
  type: types.ADD_INGREDIENT,
  payload: ingredient,
});

export const setRecipesWithDetails = (recipes) => ({
  type: types.SET_RECIPES_WITH_DETAILS,
  payload: recipes,
});

export const removeIngredient = (index) => ({
  type: types.REMOVE_INGREDIENT,
  payload: index,
});

export const showLoader = (isLoading) => ({
  type: types.SHOW_LOADER,
  payload: isLoading,
});

export const noRecipesFound = () => ({
  type: types.NO_RECIPES_FOUND,
});

export const showError = (error) => ({
  type: types.SHOW_ERROR,
  payload: error,
});

export const clearError = () => ({
  type: types.CLEAR_ERROR,
});

export const isRecipesModalOpen = (isModalOpen) => ({
  type: types.IS_RECIPES_MODAL_OPEN,
  payload: isModalOpen,
});
