import { render, act, fireEvent } from "@testing-library/react";
import {
  useContext,
  ContextProvider,
  reducer,
  ACTIONS
} from "../hooks/useContext";

import "@testing-library/jest-dom/extend-expect";

const mockUser = {
  name: "John Doe"
};

const ChildComponent = () => {
  const { state, dispatch } = useContext();

  return (
    <div>
      <div data-testid="state-value">{state?.newUser?.name}</div>
      <button
        data-testid="add-user"
        onClick={() => dispatch({ type: ACTIONS.ADD_USER, payload: mockUser })}
      >
        Add user
      </button>
      <button
        data-testid="delete-user"
        onClick={() => dispatch({ type: ACTIONS.DELETE_USER })}
      >
        Delete user
      </button>
    </div>
  );
};

const App = () => (
  <ContextProvider initialState={{ newUser: null }} reducer={reducer}>
    <ChildComponent />
  </ContextProvider>
);

describe("ContextProvider", () => {
  it("should provide the context value to descendants", () => {
    const { getByTestId } = render(<App />);

    const stateValueElement = getByTestId("state-value");
    const addUserButton = getByTestId("add-user");
    const deleteUserButton = getByTestId("delete-user");

    expect(stateValueElement).toHaveTextContent("");

    act(() => {
      fireEvent.click(addUserButton);
    });
    expect(stateValueElement).toHaveTextContent("John Doe");

    act(() => {
      fireEvent.click(deleteUserButton);
    });
    expect(stateValueElement).not.toHaveTextContent("John Doe");
  });
});
