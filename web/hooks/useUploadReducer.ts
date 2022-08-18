import { useReducer } from "react";

interface ReducerState {
  error: string;
  identifier: string;
  isCopied: boolean;
  isLoading: boolean;
  selectedFile: File | null;
}

type ActionType =
  | { type: "ERROR"; message: string }
  | { type: "SUCCESS"; payload: string }
  | { type: "LOADING" }
  | { type: "FILE"; payload: File | null }
  | { type: "COPY" };

export const useUploadReducer = (initialState: ReducerState) => {
  const [state, dispatch] = useReducer(
    (state: ReducerState, action: ActionType) => {
      switch (action.type) {
        case "ERROR": {
          return {
            ...state,
            error: action.message,
            isLoading: false,
          };
        }
        case "SUCCESS": {
          return {
            ...state,
            identifier: action.payload,
            isLoading: false,
            selectedFile: null,
          };
        }
        case "LOADING": {
          return {
            ...state,
            isLoading: true,
          };
        }
        case "FILE": {
          return {
            ...state,
            selectedFile: action.payload,
          };
        }
        case "COPY": {
          return {
            ...state,
            isCopied: !state.isCopied,
          };
        }
      }
    },
    initialState
  );

  return { state, dispatch };
};
