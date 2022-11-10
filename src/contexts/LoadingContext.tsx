import React, { createContext, Dispatch } from "react";
import { Action } from "typesafe-actions";

const initialState = {
  isLoading: false,
};

// 상태를 위한 타입
type State = {
  isLoading: boolean;
};

type StateDispatch = Dispatch<Action>;

const LoadingStateContext = React.createContext<State | null>(null);
const LoadingDispatchContext = React.createContext<StateDispatch | null>(null);

function loadingReducer(state: State, action: any) {
  switch (action.type) {
    case "SHOW":
      return { ...state, isLoading: true };
    case "HIDE":
      return { ...state, isLoading: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(loadingReducer, initialState);

  return (
    <LoadingStateContext.Provider value={state}>
      <LoadingDispatchContext.Provider value={dispatch}>
        {children}
      </LoadingDispatchContext.Provider>
    </LoadingStateContext.Provider>
  );
}

export function useLoadingState() {
  const state = React.useContext(LoadingStateContext);
  if (!state) {
    throw new Error("useLoadingState must be used within a LoadingProvider");
  }
  return state;
}

export function useLoadingDispatch() {
  const dispatch = React.useContext(LoadingDispatchContext);
  if (!dispatch) {
    throw new Error("useLoadingDispatch must be used within a LoadingProvider");
  }
  return dispatch;
}

export { showLoading, hideLoading };

function showLoading(dispatch: any) {
  dispatch({
    type: "SHOW",
  });
}

function hideLoading(dispatch: any) {
  dispatch({
    type: "HIDE",
  });
}
