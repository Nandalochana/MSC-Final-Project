import { FC, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUserStore } from "../store/user-store";

type RoleBasedRouteProps = {
  children: ReactNode;
  allowedRole: "Freelancer" | "Buyer" | "Admin";
};

export const RoleBasedRoute: FC<RoleBasedRouteProps> = ({ children, allowedRole }) => {
  const { user } = useUserStore();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  const userRole = user.loginInfo.userRoleId.role;

  if (userRole !== allowedRole) {
    if (userRole === "Freelancer") {
      return <Navigate to="/freelancer" state={{ from: location }} replace />;
    } else if (userRole === "Buyer") {
      return <Navigate to="/buyer" state={{ from: location }} replace />;
    } if (userRole === "Admin") {
      return <Navigate to="/admin" state={{ from: location }} replace />;
    }
  }

  return children;
};
