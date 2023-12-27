import React, { useState } from 'react';
import authAPIs from '../api/api';
import { AnyAction, Dispatch } from 'redux';
import { NavigateFunction } from 'react-router';

interface IProp {
  dispatch: Dispatch<AnyAction>;
  navigate: NavigateFunction;
}

export default function SignUpForm({ dispatch, navigate }: IProp) {
  const [passwordMatchError, setPasswordMatchError] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatchError("Passwords don't match");
      return;
    }
    let newData = { ...formData };
    // delete newData.firstName;
    // delete newData.lastName;
    // delete newData.confirmPassword;

    setPasswordMatchError('');
    try {
      dispatch({
        type: 'global/setLoading',
        payload: true,
      });
      const { id, token } = await authAPIs.signUp(newData);
      dispatch({
        type: 'global/setLoading',
        payload: false,
      });
      if (id) {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        dispatch({
          type: 'auth/login',
          payload: {
            id,
            token,
          },
        });
        navigate('/dashboard');
        return;
      }
      alert('failed to Signup');
      return;
    } catch (error) {
      console.log(error);
      alert('failed to Signup');
    }
    return;
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-8 border rounded-md shadow-lg bg-white">
      <h2 className="text-2xl font-semibold mb-6" data-testid="signup-form">
        Sign Up
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-600">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-600">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
        </div>
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
        <div className="mt-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        {passwordMatchError && <p className="text-red-500 text-sm mt-2">{passwordMatchError}</p>}
        <div className="mt-6">
          <button
            type="submit"
            className="bg-transparent w-full hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
