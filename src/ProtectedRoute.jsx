import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = checkAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

function checkAuth() {
  return localStorage.getItem('authToken') !== null;
}

export default ProtectedRoute;