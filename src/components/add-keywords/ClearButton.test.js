import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../state/store";
import ClearButton from "./ClearButton";

let clearButtonComponent;
beforeAll(() => {
  clearButtonComponent = (
    <Provider store={store}>
      <ClearButton />
    </Provider>
  );
});

describe("ClearButton component", () => {
  it("should display the clear button", () => {
    render(clearButtonComponent);
    const clearButton = screen.getByRole("button", {
      name: "",
    });
    expect(clearButton).toBeVisible();
  });
});
