import { createContext, FC, ReactNode, useReducer } from "react";
import { UserInfo } from "misc/interfaces";
import { AuthAction, authReducer } from ".";
import { authInitialState } from ".";

export const AuthContext = createContext<
  { authState: UserInfo; authDispatch: React.Dispatch<AuthAction> } | undefined
>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, authInitialState);

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
