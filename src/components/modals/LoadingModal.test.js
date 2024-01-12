import { act, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../state/store";
import LoadingModal from "./LoadingModal";
import { showLoader } from "../../state/actions";

describe("LoadingModal component", () => {
  it("should display the loading text and the number of recipes found", () => {
    render(
      <Provider store={store}>
        <LoadingModal />
      </Provider>
    );

    act(() => {
      store.dispatch(showLoader(true));
    });

    const loadingText = screen.getByText("Loading recipes...");
    expect(loadingText).toBeVisible();
  });
});
