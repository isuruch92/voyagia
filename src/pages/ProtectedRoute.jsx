import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/FakeAuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!loading && !isAuthenticated) {
        navigate("/");
      }
    },
    [isAuthenticated, navigate, loading]
  );
  if (loading) return null; // Render nothing while loading
  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
