import { useAuth } from "misc/hooks";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = (props) => {
  const { authState } = useAuth();

  return (
    <>{authState.token ? <Outlet /> : <Navigate replace to={"/login"} />}</>
  );
};

export default PrivateRoute;
