import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  setKeyword,
  setIngredient,
  addIngredient,
  setRecipesWithDetails,
  removeIngredient,
  showLoader,
  noRecipesFound,
  showError,
  clearError,
  isRecipesModalOpen,
} from "../actions";
import types from "../types";
import recipeSearchReducer from "../recipeSearchReducer";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

let keyword, ingredient, initialState, newState;
let error =
  "Failed to fetch recipes. Please check your API credentials or your network connection";

const recipes = [{ name: "Chicken and Beef" }, { name: "Vanilla Ice Cream" }];

describe("Recipe Search Reducer", () => {
  let action;

  it("should set the keyword", () => {
    keyword = "Chicken";
    action = setKeyword(keyword);
    newState = recipeSearchReducer(undefined, action);
    expect(newState.keyword).toEqual(keyword);
  });

  it("should set the ingredient", () => {
    ingredient = "Mushrooms";
    action = setIngredient(ingredient);
    newState = recipeSearchReducer(undefined, action);
    expect(newState.ingredient).toEqual(ingredient);
  });

  it("should add an ingredient", () => {
    ingredient = "Onions";
    initialState = {
      ingredientsList: ["Tomatoes", "Cilantro"],
    };
    action = addIngredient(ingredient);
    newState = recipeSearchReducer(initialState, action);
    expect(newState.ingredientsList).toContain(ingredient);
  });

  it("should set recipes with details", () => {
    action = setRecipesWithDetails(recipes);
    newState = recipeSearchReducer(undefined, action);
    expect(newState.recipesWithDetails).toEqual(recipes);
  });

  it("should remove an ingredient", () => {
    const indexToRemove = 1;
    initialState = {
      ingredientsList: ["Tomatoes", "Cilantro", "Onions"],
    };
    action = removeIngredient(indexToRemove);
    newState = recipeSearchReducer(initialState, action);
    expect(newState.ingredientsList).not.toContain("Cilantro");
  });

  it("should show the loader", () => {
    action = showLoader(true);
    newState = recipeSearchReducer(undefined, action);
    expect(newState.loading).toBe(true);
  });

  it("should display a message for no recipes found", () => {
    action = noRecipesFound();
    newState = recipeSearchReducer(undefined, action);
    expect(newState.noRecipesFound).toBe(
      "No recipes found. Please try a different search"
    );
  });

  it("should show an error message", () => {
    action = showError(error);
    newState = recipeSearchReducer(undefined, action);
    expect(newState.error).toBe(error);
  });

  it("should clear the error message", () => {
    initialState = {
      error: error,
    };
    action = clearError();
    newState = recipeSearchReducer(initialState, action);
    expect(newState.error).toBe(null);
  });

  it("should set the recipes modal state", () => {
    action = isRecipesModalOpen(true);
    newState = recipeSearchReducer(undefined, action);
    expect(newState.isModalOpen).toBe(true);
  });
});

describe("Recipe Search Thunk", () => {
  let actions, store;

  it("should set recipes with details", () => {
    store = mockStore({});
    store.dispatch(setRecipesWithDetails(recipes));
    actions = store.getActions();
    expect(actions[0].type).toEqual(types.SET_RECIPES_WITH_DETAILS);
    expect(actions[0].payload).toEqual(recipes);
  });

  it("should set the keyword", () => {
    keyword = "Pasta";
    store = mockStore({});
    store.dispatch(setKeyword(keyword));
    actions = store.getActions();
    expect(actions[0].type).toEqual(types.SET_KEYWORD);
    expect(actions[0].payload).toEqual(keyword);
  });

  it("should set an ingredient", () => {
    ingredient = "Cheese";
    store = mockStore({});
    store.dispatch(setIngredient(ingredient));
    actions = store.getActions();
    expect(actions[0].type).toEqual(types.SET_INGREDIENT);
    expect(actions[0].payload).toEqual(ingredient);
  });

  it("should add an ingredient", () => {
    ingredient = "Tomatoes";
    store = mockStore({});
    store.dispatch(addIngredient(ingredient));
    actions = store.getActions();
    expect(actions[0].type).toEqual(types.ADD_INGREDIENT);
    expect(actions[0].payload).toEqual(ingredient);
  });

  it("should remove an ingredient", () => {
    const indexToRemove = 1;
    store = mockStore({});
    store.dispatch(removeIngredient(indexToRemove));
    actions = store.getActions();
    expect(actions[0].type).toEqual(types.REMOVE_INGREDIENT);
    expect(actions[0].payload).toEqual(indexToRemove);
  });

  it("should show the loader", () => {
    const isLoading = true;
    store = mockStore({});
    store.dispatch(showLoader(isLoading));
    actions = store.getActions();
    expect(actions[0].type).toEqual(types.SHOW_LOADER);
    expect(actions[0].payload).toEqual(isLoading);
  });

  it("should display a message when there are no recipes found", () => {
    store = mockStore({});
    store.dispatch(noRecipesFound());
    actions = store.getActions();
    expect(actions[0].type).toEqual(types.NO_RECIPES_FOUND);
  });

  it("should show an error message", () => {
    store = mockStore({});
    store.dispatch(showError(error));
    actions = store.getActions();
    expect(actions[0].type).toEqual(types.SHOW_ERROR);
    expect(actions[0].payload).toEqual(error);
  });

  it("should clear the error message", () => {
    store = mockStore({});
    store.dispatch(clearError());
    actions = store.getActions();
    expect(actions[0].type).toEqual(types.CLEAR_ERROR);
  });

  it("should set the recipes modal state", () => {
    const isModalOpen = true;
    store = mockStore({});
    store.dispatch(isRecipesModalOpen(isModalOpen));
    actions = store.getActions();
    expect(actions[0].type).toEqual(types.IS_RECIPES_MODAL_OPEN);
    expect(actions[0].payload).toEqual(isModalOpen);
  });
});
