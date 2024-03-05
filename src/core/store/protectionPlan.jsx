import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  plans: [],
  isLoading: false,
  apiError: '',
};

const protectionPlanSlice = createSlice({
  name: 'protectionPlan',
  initialState,
  reducers: {
    LOADING: state => {
      state.isLoading = true;
    },

    SET_PROTECTION_PLAN: (state, action) => {
      state.plans = action.payload.plans;
      state.isLoading = false;
    },

    CLEAR_LOADING: state => {
      state.isLoading = false;
    },

    API_ERROR: (state, action) => {
      state.apiError = { ...action.payload };
    },
  },
});
export const { LOADING, SET_PROTECTION_PLAN, CLEAR_LOADING, API_ERROR } =
  protectionPlanSlice.actions;
export default protectionPlanSlice.reducer;
