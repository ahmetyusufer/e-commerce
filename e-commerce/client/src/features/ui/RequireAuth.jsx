import { Navigate, useLocation } from "react-router";

function RequireAuth({ children }) {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  if (!token && !isAuthPage) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (token && isAuthPage) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default RequireAuth;
