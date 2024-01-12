import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import recipeSearchReducer from "./recipeSearchReducer";

const store = createStore(recipeSearchReducer, applyMiddleware(thunk));

export default store;
