import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../state/store";
import AddIngredients from "./AddIngredients";

let addIngredientsComponent, ingredientInput, addIngredientButton;

beforeAll(() => {
  addIngredientsComponent = (
    <Provider store={store}>
      <AddIngredients />
    </Provider>
  );
});

describe("AddIngredients component", () => {
  it("should update the state of the error message after clicking the 'Add Ingredient' button with an empty ingredient", async () => {
    render(addIngredientsComponent);

    ingredientInput = screen.getByRole("textbox", {
      name: "",
    });

    addIngredientButton = screen.getByRole("button", {
      name: "Add Ingredient",
    });

    fireEvent.change(ingredientInput, { target: { value: "" } });

    fireEvent.click(addIngredientButton);

    expect(store.getState().error).toEqual(
      "Please enter an ingredient before adding"
    );
  });

  it("should update the state of the error message for a duplicate ingredient after clicking the 'Add Ingredient' button", async () => {
    render(addIngredientsComponent);

    ingredientInput = screen.getByRole("textbox", {
      name: "",
    });

    fireEvent.change(ingredientInput, { target: { value: "Eggs" } });

    expect(store.getState().ingredient).toEqual("Eggs");

    addIngredientButton = screen.getByRole("button", {
      name: "Add Ingredient",
    });

    fireEvent.click(addIngredientButton);
    expect(store.getState().ingredientsList[0]).toEqual("Eggs");

    fireEvent.change(ingredientInput, { target: { value: "Eggs" } });

    fireEvent.click(addIngredientButton);

    expect(store.getState().error).toEqual("Ingredient already added");
  });

  it("should add and display an ingredient to the ingredients list after clicking the 'Add Ingredient' button", async () => {
    render(addIngredientsComponent);

    ingredientInput = screen.getByRole("textbox", {
      name: "",
    });

    fireEvent.change(ingredientInput, { target: { value: "Bacon" } });
    expect(store.getState().ingredient).toEqual("Bacon");

    addIngredientButton = screen.getByRole("button", {
      name: "Add Ingredient",
    });

    fireEvent.click(addIngredientButton);

    expect(store.getState().ingredientsList).toEqual(["Bacon", "Eggs"]);

    const ingredientsList = screen.getByTestId("ingredients-list");
    const addedBaconAsIngredient = screen.getByText("Bacon");
    expect(ingredientsList).toContainElement(addedBaconAsIngredient);
    expect(ingredientsList).toContainElement(screen.getByText("Eggs"));
  });
});
