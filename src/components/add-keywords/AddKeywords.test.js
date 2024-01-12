import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../state/store";
import AddKeywords from "./AddKeywords";

describe("AddKeywords component", () => {
  it("should display the keyword input field", () => {
    render(
      <Provider store={store}>
        <AddKeywords />
      </Provider>
    );
    const keywordInput = screen.getByRole("textbox", {
      name: "",
    });
    expect(keywordInput).toBeVisible();
  });
});
