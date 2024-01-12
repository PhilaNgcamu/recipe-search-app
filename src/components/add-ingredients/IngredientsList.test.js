import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../state/store";
import IngredientsList from "./IngredientsList";

describe("IngredientsList component", () => {
  it("should display a list of ingredients", () => {
    render(
      <Provider store={store}>
        <IngredientsList
          ingredientsList={["Tomato", "Leeks"]}
          onRemoveIngredient={jest.fn()}
        />
      </Provider>
    );

    const tomatoIngredientRemoveButton = screen.getAllByText("Remove", {
      selector: "button",
    })[0];
    const leeksIngredientRemoveButton = screen.getAllByText("Remove", {
      selector: "button",
    })[1];

    expect(tomatoIngredientRemoveButton).toBeVisible();
    expect(leeksIngredientRemoveButton).toBeVisible();
  });
});
