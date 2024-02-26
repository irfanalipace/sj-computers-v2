import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  brands: [],
  apiError: false,
  isLoading: false,
};

const brandsSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {
    LOADING: state => {
      state.isLoading = true;
    },
    CLEAR_LOADING: state => {
      state.isLoading = false;
    },
    FETCH_BRANDS: (state, action) => {
      state.brands = [...action.payload];
      state.isLoading = false;
    },
    CLEAR_BRANDS: state => {
      state.brands = [];
    },
    API_ERROR: (state, action) => {
      state.apiError = { ...action.payload };
      state.isLoading = false;
    },
  },
});
export const { LOADING, CLEAR_LOADING, FETCH_BRANDS, CLEAR_BRANDS, API_ERROR } =
  brandsSlice.actions;
export default brandsSlice.reducer;
