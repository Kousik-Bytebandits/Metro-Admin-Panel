
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? children : <Navigate to="/Admin_Pannel" replace />;
};

export default ProtectedRoute;
