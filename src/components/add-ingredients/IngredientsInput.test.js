import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../state/store";
import IngredientInput from "./IngredientInput";

describe("IngredientInput component", () => {
  it("should display the ingredient input field and its button", () => {
    const mockHandlers = jest.fn();
    render(
      <Provider store={store}>
        <IngredientInput
          ingredient={"Tomato"}
          isLoading={false}
          onInputChange={mockHandlers}
          onAddIngredient={mockHandlers}
          onKeyDown={mockHandlers}
        />
      </Provider>
    );

    const ingredientInput = screen.getByRole("textbox", {
      name: "",
    });
    const addIngredientButton = screen.getByRole("button", {
      name: "Add Ingredient",
    });

    expect(ingredientInput).toBeVisible();
    expect(addIngredientButton).toBeVisible();
  });
});
