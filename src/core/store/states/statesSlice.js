import { createSlice } from "@reduxjs/toolkit";

let currentState = window.localStorage.getItem("state");
currentState = currentState.name ? JSON.parse(currentState) : null;

const initialState = {
    states: [],
    currentState: currentState,
    apiError: false,
    isLoading: false,
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
            state.isLoading = false;
        },
        UPDATE_STATE: (state, action) => {
            state.currentState = { ...action.payload };
            window.localStorage.setItem(
                "state",
                JSON.stringify(action.payload)
            );
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
