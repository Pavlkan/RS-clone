import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: JSX.Element;
  condition: boolean;
  redirect: string;
}

export const ProtectedRoute = ({ children, condition, redirect }: ProtectedRouteProps) => {
  if (!condition) {
    return <Navigate to={redirect} replace />;
  }

  return children;
};
