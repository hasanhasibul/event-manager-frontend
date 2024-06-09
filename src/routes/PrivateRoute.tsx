import { Navigate, Outlet } from "react-router-dom";
import { getAllCookies } from "../lib/helpers";

const PrivateRoute = () => {
  const { authToken, name } = getAllCookies();
  if (name && authToken) {
    return <Outlet />;
  } else if (authToken && !name) {
    return <Navigate to="/404" replace />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;
