import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (user?.role !== "ADMIN") {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default AdminRoute;