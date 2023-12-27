import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthState } from '../reducers/authSlice';

interface IAuthState {
  auth: AuthState;
}

interface Props {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const { isAuthenticated } = useSelector((state: IAuthState) => ({
    isAuthenticated: state?.auth?.isAuthenticated,
  }));
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/signin"
        state={{
          from: location?.pathname,
        }}
      />
    );
  }

  return children;
};

export default PrivateRoute;
