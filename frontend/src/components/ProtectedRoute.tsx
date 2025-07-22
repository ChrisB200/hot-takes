import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import type { FC } from "react";
import { useUser } from "@/contexts/UserContext";

const ProtectedRoute: FC = () => {
  const { user, loading, error, finished } = useUser();
  const location = useLocation();
  const redirectUri = encodeURIComponent(location.pathname);

  if (loading) {
    return <div>Loading...</div>;
  }

  if ((!user || error) && finished) {
    return <Navigate to={`/login?redirect=${redirectUri}`} replace />;
  }

  if (finished) {
    if (user) {
      console.log(location.pathname);
      if (!user.username && location.pathname != "/complete-signup")
        return (
          <Navigate to={`/complete-signup?redirect=${redirectUri}`} replace />
        );
    }
    return <Outlet />;
  }

  // Optional fallback to satisfy return type
  return null;
};

export default ProtectedRoute;
