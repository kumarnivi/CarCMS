import React from 'react';
import { Navigate } from 'react-router-dom';


const PrivateRoute = ({ children, role }: { children: JSX.Element, role: string }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const userRole = localStorage.getItem('userRole');

  if (isAuthenticated && userRole === role) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
