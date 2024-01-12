import {
  fireEvent,
  render,
  screen,
  act,
  waitFor,
} from "@testing-library/react";
import { Provider } from "react-redux";
import fetchMock from "jest-fetch-mock";
import store from "../../state/store";
import RecipeSearch from "./RecipeSearch";
import {
  showLoader,
  setRecipesWithDetails,
  clearError,
} from "../../state/actions";

let recipeSearchComponent,
  fetchSpy,
  keywordInput,
  searchButton,
  ingredientInput,
  addIngredientButton,
  errorMessage;

beforeAll(() => {
  fetchMock.enableMocks();
  fetchSpy = jest.spyOn(global, "fetch");

  recipeSearchComponent = (
    <Provider store={store}>
      <RecipeSearch />
    </Provider>
  );
});

beforeEach(() => {
  store.dispatch(showLoader(false));
  store.dispatch(setRecipesWithDetails([]));
  store.dispatch(clearError());
});

afterEach(() => {
  fetchSpy.mockRestore();
  fetchMock.resetMocks();
});

describe("RecipeSearch component", () => {
  it("should display the form title", () => {
    render(recipeSearchComponent);
    const formTitle = screen.getByText("Recipe App");
    expect(formTitle).toBeVisible();
  });

  it("should add an ingredient and keyword after clicking the 'Search' button then load for search results during the API call", async () => {
    fetchSpy.mockImplementation(() => Promise.resolve({}));

    render(recipeSearchComponent);

    keywordInput = screen.getByPlaceholderText("Enter Keywords...");
    searchButton = screen.getByText("Search", {
      selector: "button",
    });

    ingredientInput = screen.getByPlaceholderText("Add ingredient...");
    addIngredientButton = screen.getByText("Add Ingredient", {
      selector: "button",
    });

    fireEvent.change(ingredientInput, { target: { value: "Bacon" } });
    fireEvent.change(keywordInput, { target: { value: "Omelette" } });

    await act(async () => {
      expect(store.getState().loading).toBe(false);

      fireEvent.click(addIngredientButton);
      fireEvent.click(searchButton);

      expect(store.getState().loading).toBe(true);
    });

    expect(fetchSpy).toHaveBeenCalled();
  });

  it("should display fetched recipes and its ingredient after clicking the 'Search' button with an ingredient and keyword", async () => {
    const mockResponse = {
      hits: [
        {
          name: "Bacon Omelette",
          ingredients: ["Bacon"],
          picture: "https://example.com/bacon-omelette.jpg",
        },
      ],
    };

    fetchSpy.mockResolvedValue({
      json: () => Promise.resolve(mockResponse),
    });

    render(recipeSearchComponent);

    keywordInput = screen.getByPlaceholderText("Click to Clear");
    searchButton = screen.getByText("Search", {
      selector: "button",
    });

    ingredientInput = screen.getByPlaceholderText("Add ingredient...");
    addIngredientButton = screen.getByText("Add Ingredient", {
      selector: "button",
    });

    fireEvent.change(ingredientInput, { target: { value: "Bacon" } });
    fireEvent.change(keywordInput, { target: { value: "Bacon Omelette" } });

    await act(async () => {
      fireEvent.click(addIngredientButton);
      fireEvent.click(searchButton);
    });

    expect(fetchSpy).toHaveBeenCalled();

    const baconIngredientRemoveButton = screen.getByText("Remove", {
      selector: "button",
    });
    expect(baconIngredientRemoveButton).toBeVisible();

    const recipeList = screen.getByTestId("recipe-list");
    expect(recipeList).toBeVisible();
  });

  it("should call the fetch API with the correct URL including ID and Key with ingredient and the keyword after clicking the 'Search' button", async () => {
    fetchSpy.mockResolvedValue({});

    render(recipeSearchComponent);

    keywordInput = screen.getByPlaceholderText("Click to Clear");
    searchButton = screen.getByText("Search", {
      selector: "button",
    });

    ingredientInput = screen.getByPlaceholderText("Add ingredient...");
    addIngredientButton = screen.getByText("Add Ingredient", {
      selector: "button",
    });

    fireEvent.change(ingredientInput, { target: { value: "Bacon" } });
    fireEvent.change(keywordInput, { target: { value: "Omelette" } });

    await act(async () => {
      fireEvent.click(addIngredientButton);
      fireEvent.click(searchButton);
    });

    const appId = process.env.REACT_APP_RECIPE_SEARCH_APP_ID;
    const appKey = process.env.REACT_APP_RECIPE_SEARCH_APP_KEY;

    expect(fetchSpy).toHaveBeenCalledWith(
      `https://api.edamam.com/api/recipes/v2?q=Omelette Bacon&app_id=${appId}&app_key=${appKey}&type=public`,
      { method: "GET" }
    );
  });

  it("should display an error message after clicking on the 'Search' button with a valid ingredient and keyword", async () => {
    fetchSpy.mockResolvedValue({
      json: () => {
        throw new Error("Failed to fetch");
      },
    });

    render(recipeSearchComponent);

    keywordInput = screen.getByPlaceholderText("Click to Clear");
    searchButton = screen.getByText("Search", {
      selector: "button",
    });

    ingredientInput = screen.getByPlaceholderText("Add ingredient...");
    addIngredientButton = screen.getByText("Add Ingredient", {
      selector: "button",
    });

    fireEvent.change(ingredientInput, { target: { value: "Bacon" } });
    fireEvent.change(keywordInput, { target: { value: "Omelette" } });

    await act(async () => {
      fireEvent.click(addIngredientButton);
      fireEvent.click(searchButton);
    });

    errorMessage =
      "Failed to fetch recipes. Please check your API credentials or your network connection";

    expect(store.getState().error).toBe(errorMessage);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeVisible();
    });
  });

  it("should display an error message after clicking on the 'Search' button with an invalid ingredient and keyword", async () => {
    fetchSpy.mockResolvedValue({
      json: async () => ({
        hits: [],
      }),
    });

    render(recipeSearchComponent);

    keywordInput = screen.getByPlaceholderText("Click to Clear");
    searchButton = screen.getByText("Search", {
      selector: "button",
    });

    ingredientInput = screen.getByPlaceholderText("Add ingredient...");
    addIngredientButton = screen.getByText("Add Ingredient", {
      selector: "button",
    });

    fireEvent.change(ingredientInput, { target: { value: "hhhhh" } });
    fireEvent.change(keywordInput, { target: { value: "hhhhh" } });

    await act(async () => {
      fireEvent.click(addIngredientButton);
      fireEvent.click(searchButton);
    });

    errorMessage = "No recipes found. Please try a different search";
    expect(store.getState().noRecipesFound).toBe(errorMessage);

    expect(screen.getByText(errorMessage)).toBeVisible();
  });
});
