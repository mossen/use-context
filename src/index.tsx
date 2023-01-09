import React from "react";
import { render } from "react-dom";
import {
  useContext,
  ContextProvider,
  reducer,
  ACTIONS
} from "./hooks/useContext";

const mockUser = {
  name: "John Doe"
};

const Component = () => {
  const { state, dispatch } = useContext();

  return (
    <>
      <button
        onClick={() => dispatch({ type: ACTIONS.ADD_USER, payload: mockUser })}
      >
        Dispatch add user action
      </button>
      <br />
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_USER })}>
        Dispatch delete new user action
      </button>
      <br />
      name: {state?.newUser?.name}
    </>
  );
};

const App = () => {
  return (
    <ContextProvider initialState={{}} reducer={reducer}>
      <Component />
    </ContextProvider>
  );
};
render(<App />, document.getElementById("root"));
