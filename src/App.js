import { Provider } from "react-redux";
import RecipeSearch from "./components/recipe-search/RecipeSearch";
import store from "./state/store";
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <RecipeSearch />
    </Provider>
  );
};

export default App;
