import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../state/store";
import ErrorMessage from "./ErrorMessage";

describe("ErrorMessage component", () => {
  it("should display error message", () => {
    const errorMessage =
      "Please enter keywords or ingredients before searching";
    render(
      <Provider store={store}>
        <ErrorMessage displayErrorMessage={errorMessage} />
      </Provider>
    );

    const displayErrorMessage = screen.getByText(errorMessage);

    expect(displayErrorMessage).toBeVisible();
  });
});
