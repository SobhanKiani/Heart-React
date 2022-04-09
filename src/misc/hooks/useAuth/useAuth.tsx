import { useContext } from "react";
import { AuthContext } from "misc/context";

export const useAuth = () => {
  const { authState, authDispatch } = useContext(AuthContext);

  return {
    authState,
    authDispatch,
  };
};
