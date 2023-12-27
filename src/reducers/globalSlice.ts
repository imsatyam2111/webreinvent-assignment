import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  loading: boolean;
}

const initialState: IInitialState = {
  loading: true,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export default globalSlice.reducer;
