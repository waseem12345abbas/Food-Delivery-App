// src/auth/PrivateRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function PrivateRoute({ children }) {
  const { isAuthed } = useAuth();
  const location = useLocation();
  const userType = sessionStorage.getItem("userType");

  // Allow guest users to access my-order page
  if (!isAuthed && userType !== "guest") {
    // Save the current path to redirect after login
    sessionStorage.setItem("redirectAfterLogin", location.pathname + location.search);
    return <Navigate to="/login" replace />;
  }

  return children;
}
