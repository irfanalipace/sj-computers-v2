import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [
        {
            id: 1,
            imageSrc: "https://via.placeholder.com/165x135",
            name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temp eiusmod tempor incididunt.",
            rating: 4.5,
            numReviews: 100,
            offPercentage: 20,
            originalPrice: "$100",
            newPrice: "$80",
            deliveryCharges: "Free delivery",
        },
        {
            id: 2,
            imageSrc: "https://via.placeholder.com/165x135",
            name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temp eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temp eiusmod tempor incididunt.",
            rating: 3.5,
            numReviews: 50,
            offPercentage: 10,
            originalPrice: "$50",
            newPrice: "$45",
            deliveryCharges: "$5 delivery",
        },
        {
            id: 3,
            imageSrc: "https://via.placeholder.com/165x135",
            name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temp eiusmod tempor incididunt. 3",
            rating: 4,
            numReviews: 75,
            offPercentage: 30,
            originalPrice: "$80",
            newPrice: "$56",
            deliveryCharges: "Free delivery",
        },
        {
            id: 4,
            imageSrc: "https://via.placeholder.com/165x135",
            name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temp eiusmod tempor incididunt. 4",
            rating: 5,
            numReviews: 120,
            offPercentage: 15,
            originalPrice: "$90",
            newPrice: "$76",
            deliveryCharges: "$5 delivery",
        },
        {
            id: 5,
            imageSrc: "https://via.placeholder.com/165x135",
            name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temp eiusmod tempor incididunt. 5",
            rating: 4.5,
            numReviews: 90,
            offPercentage: 25,
            originalPrice: "$120",
            newPrice: "$90",
            deliveryCharges: "Free delivery",
        },
        {
            id: 6,
            imageSrc: "https://via.placeholder.com/165x135",
            name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temp eiusmod tempor incididunt. 1",
            rating: 4.5,
            numReviews: 100,
            offPercentage: 20,
            originalPrice: "$100",
            newPrice: "$80",
            deliveryCharges: "Free delivery",
        },
        {
            id: 7,
            imageSrc: "https://via.placeholder.com/165x135",
            name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temp eiusmod tempor incididunt. 2",
            rating: 3.5,
            numReviews: 50,
            offPercentage: 10,
            originalPrice: "$50",
            newPrice: "$45",
            deliveryCharges: "$5 delivery",
        },
        {
            id: 8,
            imageSrc: "https://via.placeholder.com/165x135",
            name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temp eiusmod tempor incididunt. 3",
            rating: 4,
            numReviews: 75,
            offPercentage: 30,
            originalPrice: "$80",
            newPrice: "$56",
            deliveryCharges: "Free delivery",
        },
        {
            id: 9,
            imageSrc: "https://via.placeholder.com/165x135",
            name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temp eiusmod tempor incididunt. 4",
            rating: 5,
            numReviews: 120,
            offPercentage: 15,
            originalPrice: "$90",
            newPrice: "$76",
            deliveryCharges: "$5 delivery",
        },
        {
            id: 10,
            imageSrc: "https://via.placeholder.com/165x135",
            name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temp eiusmod tempor incididunt. 5",
            rating: 4.5,
            numReviews: 90,
            offPercentage: 25,
            originalPrice: "$120",
            newPrice: "$90",
            deliveryCharges: "Free delivery",
        },
    ],
    apiError: false,
    isLoading: false,
    currentPage: 1,
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        LOADING: (state) => {
            state.isLoading = true;
        },
        CLEAR_LOADING: (state) => {
            state.isLoading = false;
        },
        FETCH_PRODUCTS: (state, action) => {
            state.products = [...state.products, ...action.payload];
            state.currentPage = state.currentPage + 1;
        },
        CLEAR_PRODUCTS: (state) => {
            state.products = [];
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
    FETCH_PRODUCTS,
    CLEAR_PRODUCTS,
    API_ERROR,
} = productSlice.actions;
export default productSlice.reducer;
