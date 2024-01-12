import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../state/store";
import InputKeyword from "./InputKeyword";

describe("InputKeyword component", () => {
  it("should display the input keyword", () => {
    render(
      <Provider store={store}>
        <InputKeyword />
      </Provider>
    );
    const keywordInput = screen.getByRole("textbox", {
      name: "",
    });
    expect(keywordInput).toBeVisible();
  });
});
