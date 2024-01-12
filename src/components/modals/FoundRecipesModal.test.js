import { act, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../state/store";
import FoundRecipesModal from "./FoundRecipesModal";
import { isRecipesModalOpen } from "../../state/actions";

describe("FoundRecipesModal component", () => {
  it("should display the modal and its 'close' button", () => {
    render(
      <Provider store={store}>
        <FoundRecipesModal />
      </Provider>
    );

    act(() => {
      store.dispatch(isRecipesModalOpen(true));
    });

    const modalContent = screen.getByText(
      "No recipes found. Please try a different search"
    );
    expect(modalContent).toBeVisible();
  });
});
