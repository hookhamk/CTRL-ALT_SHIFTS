import { useUserService } from "../services/userService";
import { Navigate } from "react-router-dom";

export const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isAdmin, loading } = useUserService();

  if (loading) return <p>Loading...</p>;
  if (!user || !isAdmin) return <Navigate to="/unauthorized" replace />;

  return children;
};
