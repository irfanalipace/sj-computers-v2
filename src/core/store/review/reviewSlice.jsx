import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    reviews: {},
};

const reviewSlice = createSlice({
    name: "review",
    initialState,
    reducers: {
        ADD_REVIEW: (state, action) => {
            state.reviews = { ...action.payload };
        },
        CLEAR_REVIEW: (state) => {
            state.reviews = {};
        },
    },
});
export const { ADD_REVIEW, CLEAR_REVIEW } = reviewSlice.actions;
export default reviewSlice.reducer;
