import React from "react";
import { useAuth } from "./use-auth";
import { Navigate } from "react-router-dom";
import {getAuthCookie} from "../utils";

export const RequireAuth = ({ children }) => {
  const auth = useAuth();
  const cookie = getAuthCookie();
  return cookie ? (
    children
  ) : (
    <Navigate to="/login"/>
  );
};