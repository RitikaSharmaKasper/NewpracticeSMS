// components/auth/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Cookies from "js-cookie";

const PrivateRoute = ({ children }) => {
  const { user, loading, authReady } = useAuth();
  const hasToken = Cookies.get("token");

  if (loading || !authReady) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Allow if user exists OR token exists (user data might be loading)
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;