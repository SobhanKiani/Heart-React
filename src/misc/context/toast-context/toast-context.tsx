import { createContext, FC, ReactNode, useReducer } from "react";
import { toastInitialState, toastReducer } from "./types";

export const ToastContext = createContext(undefined);

export const ToastProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [toastState, toastDispatch] = useReducer(toastReducer, toastInitialState);
  return (
    <ToastContext.Provider value={{ toastState: toastState, toastDispatch }}>
      {children}
    </ToastContext.Provider>
  );
};
