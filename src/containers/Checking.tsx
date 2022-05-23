import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Checking() {
  const { checking, user } = useAuth();

  if (checking) {
    return null;
  }

  console.log(checking, user);

  if (user) {
    return <Navigate to="/app/pad/1" />;
  }

  return <Navigate to="/signin" />;
}
