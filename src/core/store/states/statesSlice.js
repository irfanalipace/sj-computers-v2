import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    states: [],
    currentState: null,
    apiError: false,
    isLoading: false,
    currentPage: 1,
};

const productSlice = createSlice({
    name: "states",
    initialState,
    reducers: {
        LOADING: (state) => {
            state.isLoading = true;
        },
        CLEAR_LOADING: (state) => {
            state.isLoading = false;
        },
        FETCH_STATES: (state, action) => {
            state.states = [...action.payload];
            state.currentPage = state.currentPage + 1;
            state.isLoading = false;
        },
        UPDATE_STATE: (state, action) => {
            state.currentState = { ...action.payload };
            state.isLoading = false;
        },
        CLEAR_STATES: (state) => {
            state.states = [];
        },
        API_ERROR: (state, action) => {
            state.apiError = { ...action.payload };
            state.isLoading = false;
        },
    },
});
export const {
    LOADING,
    CLEAR_LOADING,
    FETCH_STATES,
    CLEAR_STATES,
    UPDATE_STATE,
    API_ERROR,
} = productSlice.actions;
export default productSlice.reducer;
