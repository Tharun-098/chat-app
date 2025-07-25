import { Navigate } from "react-router-dom";

const PrivateRoute = ({ userr, children }) => {
  return userr ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;