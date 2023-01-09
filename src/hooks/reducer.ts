export type User = {
  name: string;
};

export type ContextState = {
  newUser?: User;
};

export enum ACTIONS {
  ADD_USER = "ADD_USER",
  DELETE_USER = "DELETE_USER"
}

export type ContextActions =
  | { type: ACTIONS.ADD_USER; payload: User }
  | { type: ACTIONS.DELETE_USER; payload?: null }
  | { type: any; payload?: null };

export const reducer = (
  state: ContextState,
  action: ContextActions
): ContextState => {
  switch (action.type) {
    case ACTIONS.ADD_USER:
      return { ...state, newUser: action.payload };
    case ACTIONS.DELETE_USER:
      return { ...state, newUser: null };
    default: {
      return state;
    }
  }
};
