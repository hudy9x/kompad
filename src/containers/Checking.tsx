import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getCache } from "../libs/localCache";

export default function Checking() {
  const { checking, user } = useAuth();

  if (checking) {
    return null;
  }

  if (user) {
    const currentPad = getCache("currentPad") || "";
    return <Navigate to={`/app/pad/${currentPad}`} />;
  }

  return <Navigate to="/signin" />;
}
