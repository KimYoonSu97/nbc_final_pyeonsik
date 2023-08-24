import React from 'react';
import { Navigate, Outlet } from 'react-router';

export const PrivateRoute = () => {

  const token = localStorage.getItem('sb-wwkfivwrtwucsiwsnisz-auth-token');

  const tokenCheck = (token: string | null) => {
    if (token) {
      return true;
    } else {
      alert('로그인 후 이용 가능합니다.');
      return false;
    }
  };
  
  return tokenCheck(token) ? <Outlet /> : <Navigate to="/" />;
};
