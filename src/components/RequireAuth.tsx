import { Navigate, useLocation } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

export default function RequireAuth({ children }: Props) {
  const location = useLocation();
  const token = localStorage.getItem("auth_token");

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}
