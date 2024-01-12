import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../state/store";
import RecipeCard from "./RecipeCard";

describe("RecipeCard component", () => {
  it("should display a recipe card content", () => {
    const recipe = {
      name: "Chicken and Mushroom Pizza",
      picture: "pizza.jpg",
      ingredients: ["Chicken", "Mushroom"],
    };

    render(
      <Provider store={store}>
        <RecipeCard recipe={recipe} />
      </Provider>
    );

    const recipeName = screen.getByText("Chicken and Mushroom Pizza");
    const chickenIngredient = screen.getByText("Chicken");
    const mushroomIngredient = screen.getByText("Mushroom");
    const viewRecipeButton = screen.getByText("View Recipe");

    expect(recipeName).toBeVisible();
    expect(chickenIngredient).toBeVisible();
    expect(mushroomIngredient).toBeVisible();
    expect(viewRecipeButton).toBeVisible();
  });
});
