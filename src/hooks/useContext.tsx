import * as React from "react";

import { ContextState, ContextActions } from "./reducer";
export * from "./reducer";

const Context = React.createContext({ state: null });

interface IContextProvider<State, Action> {
  children: React.ReactNode;
  initialState: State;
  reducer: (state: State, action: Action) => any;
}

export const ContextProvider = <State extends unknown, Action extends unknown>({
  children,
  reducer,
  initialState
}: IContextProvider<State, Action>): React.ReactElement => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useContext = function <
  State = ContextState,
  Action = ContextActions
>(): {
  state: State;
  dispatch: React.Dispatch<Action>;
} {
  const context = React.useContext(Context);

  return context as { state: State; dispatch: React.Dispatch<Action> };
};
