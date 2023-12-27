import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import dataReducer from './dataSlice';
import globalReducer from './globalSlice';

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  data: dataReducer,
  global: globalReducer,
  // Add other reducers as needed
});

export default rootReducer;
