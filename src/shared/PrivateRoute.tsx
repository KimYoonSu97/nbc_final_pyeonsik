import React from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router';

export const PrivateRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem('sb-wwkfivwrtwucsiwsnisz-auth-token');
  console.log(location);
  const tokenCheck = (token: string | null) => {
    if (token) {
      return true;
    } else {
      // navigate('/login', { state: { backgroundLocation: location } });
      // alert('로그인 후 이용 가능합니다.');
      return false;
    }
  };

  return tokenCheck(token) ? <Outlet /> : <Navigate to="/login" state={{ backgroundLocation: location }} />;
};
