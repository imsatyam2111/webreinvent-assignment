import React, { useState } from 'react';
import authAPIs from '../api/api';
import { AnyAction, Dispatch } from 'redux';
import { NavigateFunction } from 'react-router';

interface IProp {
  dispatch: Dispatch<AnyAction>;
  navigate: NavigateFunction;
}

export default function SignInForm({ dispatch, navigate }: IProp) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      dispatch({
        type: 'global/setLoading',
        payload: true,
      });
      const { token } = await authAPIs.signIn(formData);
      dispatch({
        type: 'global/setLoading',
        payload: false,
      });
      if (token) {
        setFormData({
          email: '',
          password: '',
        });
        dispatch({
          type: 'auth/login',
          payload: {
            token,
          },
        });
        navigate('/dashboard');
        return;
      }
      alert('failed to Signin');
      return;
    } catch (error) {
      console.log(error);
      alert('failed to Signin');
    }
    return;
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-8 border rounded-md shadow-lg bg-white" data-testid="signin-page">
      <h2 className="text-2xl font-semibold mb-6" data-testid="signin-form">
        Sign In
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mt-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mt-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="bg-transparent w-full hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
