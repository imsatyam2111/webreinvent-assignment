import React, { useEffect } from 'react';
import api from '../api/api';
import { useDispatch } from 'react-redux';

const DashboardPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const APIFunc = async () => {
      try {
        dispatch({
          type: 'global/setLoading',
          payload: true,
        });
        const { id } = await api.getUserData();
        dispatch({
          type: 'global/setLoading',
          payload: false,
        });
        if (id) {
          // alert('Fetced User id' + ' ' + id);
        }
      } catch (error) {
        console.log(error);
      }
    };
    APIFunc();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-2">Card 1</h3>
          <p className="text-gray-700">Content for card 1</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-2">Card 2</h3>
          <p className="text-gray-700">Content for card 2</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-2">Card 3</h3>
          <p className="text-gray-700">Content for card 3</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
