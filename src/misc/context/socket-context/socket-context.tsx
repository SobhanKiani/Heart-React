import React, {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  useReducer,
} from "react";
import {
  SocketAction,
  socketInitialState,
  socketReducer,
  SocketStateType,
} from "./types";

export const SocketContext = createContext<
  | { socketState: SocketStateType; socketDispatch: Dispatch<SocketAction> }
  | undefined
>(undefined);

export const SocketProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [socketState, socketDispatch] = useReducer(
    socketReducer,
    socketInitialState
  );

  return (
    <SocketContext.Provider value={{ socketState, socketDispatch }}>
      {children}
    </SocketContext.Provider>
  );
};
