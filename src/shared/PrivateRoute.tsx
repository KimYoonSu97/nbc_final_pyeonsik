import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { toast } from 'react-toastify';
import { EMAIL_CHECK } from 'src/utility/guide';

export const PrivateRoute = () => {
  const token = localStorage.getItem('sb-wwkfivwrtwucsiwsnisz-auth-token');

  const tokenCheck = (token: string | null) => {
    if (token) {
      return true;
    } else {
      toast(EMAIL_CHECK);
      return false;
    }
  };

  return tokenCheck(token) ? <Outlet /> : <Navigate to="/" />;
};
