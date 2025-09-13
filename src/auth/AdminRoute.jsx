import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function AdminRoute({ children }) {
  const { isAuthed, user } = useAuth();
  const location = useLocation();

  // Debug logging
  console.log("AdminRoute Debug:", { isAuthed, user, userRole: user?.role });

  // If not authenticated, redirect to login
  if (!isAuthed) {
    console.log("AdminRoute: User not authenticated, redirecting to login");
    // Save the current path to redirect after login
    sessionStorage.setItem("redirectAfterLogin", location.pathname + location.search);
    return <Navigate to="/login" replace />;
  }

  // If authenticated but not admin, redirect to home
  if (user && user.role !== "admin") {
    console.log("AdminRoute: User authenticated but not admin, redirecting to home");
    return <Navigate to="/" replace />;
  }

  // If authenticated and admin, allow access
  console.log("AdminRoute: User is admin, allowing access");
  return children;
}
