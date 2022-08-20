import { useReducer } from "react";

interface ReducerState {
  error: string;
  identifier: string;
  filters: string[] | null;
  isLoading: boolean;
  data: Record<string, number> | null;
}

interface EditPayload {
  key: string;
  newKey: string;
}

type ActionType =
  | { type: "ERROR"; message: string }
  | { type: "SUCCESS"; payload: Record<string, number> }
  | { type: "LOADING" }
  | { type: "SET_IDENTIFIER"; payload: string }
  | { type: "SET_FILTERS"; payload: string }
  | { type: "RESET" }
  | { type: "EDIT"; payload: EditPayload };

export const useResultReducer = (initialState: ReducerState) => {
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
            data: action.payload,
            isLoading: false,
          };
        }
        case "LOADING": {
          return {
            ...state,
            isLoading: true,
          };
        }
        case "SET_IDENTIFIER": {
          return {
            ...state,
            identifier: action.payload,
          };
        }
        case "SET_FILTERS": {
          return {
            ...state,
            filters: action.payload.split(","),
          };
        }
        case "RESET": {
          return {
            ...state,
            filters: null,
            data: null,
            identifier: "",
          };
        }
        case "EDIT": {
          return {
            ...state,
            data: <Record<string, number>>(
              editObjectKey({ ...action.payload, state: state.data! })
            ),
          };
        }
        default: {
          return state;
        }
      }
    },
    initialState
  );
  return { state, dispatch };
};

interface EditObjectKeyParams {
  state: Object;
  key: string;
  newKey: string;
}

type editObjectKeyFunction = (params: EditObjectKeyParams) => Object;

const editObjectKey: editObjectKeyFunction = ({ state, key, newKey }) =>
  Object.fromEntries(
    Object.entries(state).map(([k, v]) => (k === key ? [newKey, v] : [k, v]))
  );
