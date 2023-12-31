import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SignInForm from '../components/SignInForm';
import { AuthState } from '../reducers/authSlice';

interface IAuthState {
  auth: AuthState;
}

const SignInPage = () => {
  const { isAuthenticated } = useSelector((state: IAuthState) => ({
    isAuthenticated: state.auth.isAuthenticated,
  }));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, []);

  return <SignInForm dispatch={dispatch} navigate={navigate} />;
};

export default SignInPage;
