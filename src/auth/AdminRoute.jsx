import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function AdminRoute({ children }) {
  const { isAuthed, user } = useAuth();
  const location = useLocation();

  // If not authenticated, redirect to login
  if (!isAuthed) {
    // Save the current path to redirect after login
    sessionStorage.setItem("redirectAfterLogin", location.pathname + location.search);
    return <Navigate to="/login" replace />;
  }

  // If authenticated but not admin, redirect to home
  if (user && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // If authenticated and admin, allow access
  return children;
}
