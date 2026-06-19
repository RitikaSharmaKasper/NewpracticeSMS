// components/auth/PublicRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";  // ✅ Fixed import path

const PublicRoute = ({ children }) => {
  const { user, loading, authReady } = useAuth();
  const location = useLocation();

  if (loading || !authReady) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (user && location.pathname !== "/otp") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;