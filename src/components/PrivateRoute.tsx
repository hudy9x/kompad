import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LoadingRoute from "./LoadingRoute";

interface IPrivateRouteProps {
  children: JSX.Element | JSX.Element[];
}

export default function PrivateRoute({ children }: IPrivateRouteProps) {
  const { checking, user } = useAuth();

  if (checking) {
    return <LoadingRoute />;
  }

  if (!checking && !user) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
}
