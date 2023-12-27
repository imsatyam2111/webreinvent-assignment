import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AuthState } from '../reducers/authSlice';

interface IAuthState {
  auth: AuthState;
}

export default function Nav() {
  const { isAuthenticated } = useSelector((state: IAuthState) => ({
    isAuthenticated: state?.auth?.isAuthenticated,
  }));
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({
      type: 'auth/logout',
    });
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Link to="/dashboard">
        <div style={{ marginRight: 20 }}>Dashboard</div>
      </Link>
      {isAuthenticated && (
        <button
          onClick={handleLogout}
          className="bg-transparent hover:bg-red-500 text-white font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
        >
          Logout
        </button>
      )}
      {!isAuthenticated && (
        <Link to="/signup">
          <button className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
            Sign Up
          </button>
        </Link>
      )}
    </div>
  );
}
