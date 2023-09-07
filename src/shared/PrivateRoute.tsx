import React from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { NON_MEMBER } from 'src/utility/message';

export const PrivateRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem('sb-wwkfivwrtwucsiwsnisz-auth-token');

  const tokenCheck = (token: string | null) => {
    if (token) {
      return true;
    } else {
      // navigate('/login', { state: { backgroundLocation: location } });
      toast(NON_MEMBER);
      return false;
    }
  };

  return tokenCheck(token) ? <Outlet /> : <Navigate to="/" />;
};
