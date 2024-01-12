import { act, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../state/store";
import RecipeList from "./RecipeList";
import { setRecipesWithDetails } from "../../state/actions";

describe("RecipeList component", () => {
  it("should display a list of recipes", () => {
    const recipesWithDetails = [
      {
        name: "Chicken and Beef",
        picture: "chicken-and-beef.jpg",
        ingredients: ["Chicken", "Beef"],
      },
      {
        name: "Vanilla and Chocolate Ice Cream",
        picture: "ice-cream.jpg",
        ingredients: ["Vanilla Cream", "Chocolate"],
      },
    ];

    render(
      <Provider store={store}>
        <RecipeList />
      </Provider>
    );

    act(() => {
      store.dispatch(setRecipesWithDetails(recipesWithDetails));
    });

    const chickenAndBeef = screen.getByText("Chicken and Beef");
    const vanillaAndChocolateIceCream = screen.getByText("Vanilla Cream");

    expect(chickenAndBeef).toBeVisible();
    expect(vanillaAndChocolateIceCream).toBeVisible();
  });
});
