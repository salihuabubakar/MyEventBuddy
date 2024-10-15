import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useCurrentUser from "./hook/getCurrentUser";
import { Spinner } from './Components/Spinner/spinner';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { currentUser, loading } = useCurrentUser();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner className="w-8 h-8 text-blue-500" />
      </div>
    )
  }
  
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;