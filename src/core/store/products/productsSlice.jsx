import { createSlice, current } from '@reduxjs/toolkit';
const params = new URLSearchParams(window.location.search);
let searchParam = params.get('s');
const filtesArrayOfObject = [
  {
    key: 'processor',
    value: [],
  },
  {
    key: 'ram_memory',
    checked: [],
    value: {
      unit: [],
      min: 0,
      max: 0,
    },
  },
  {
    key: 'review',
    value: {
      min: 0,
      max: 0,
    },
  },
  {
    key: 'price',
    value: {
      min: 0,
      max: 0,
    },
  },
  {
    key: 'brand',
    value: [],
  },
  {
    key: 'operating_system',
    value: [],
  },

  {
    key: 'gpu',
    value: [],
  },
  {
    key: 'hard_disk',
    checked: [],
    value: {
      unit: [],
      min: 0,
      max: 0,
    },
  },
  {
    key: 'screen',
    value: [],
  },
];
const initialState = {
  products: [],
  filtersProduct: [],
  searchString: searchParam,
  isShowMore: false,
  filtersArray: filtesArrayOfObject,
  isFiltering: false,
  selectedCategory: null,
  apiError: false,
  isLoading: false,
  currentPage: 1,
  filterTotal: 0,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    LOADING: state => {
      state.isLoading = true;
    },
    SET_PRODUCT_LOADING: (state, action) => {
      state.isLoading = true;
      let index = state.products.findIndex(
        item => item.id === action.payload?.id,
      );
      if (index >= 0) {
        state.products[index] = {
          ...state.products[index],
          loading: true,
        };
      }
    },
    SET_PRODUCT_CLEAR_LOADING: (state, action) => {
      let index = state.products.findIndex(
        item => item.id === action.payload.id,
      );
      if (index >= 0) {
        state.products[index] = {
          ...state.products[index],
          loading: false,
        };
        state.isLoading = false;
      }
    },

    CLEAR_LOADING: state => {
      state.isLoading = false;
    },

    FETCH_PRODUCTS: (state, action) => {
      if (state.currentPage === 1) state.products = [...action.payload];
      else state.products = [...state.products, ...action.payload];
      state.currentPage = state.currentPage + 1;
      state.isLoading = false;
      state.isFiltering = false;
      state.isShowMore = false;
    },

    FILTER_PRODUCTS: (state, action) => {
      state.filterTotal = action.payload.total;
      state.filterTo = action.payload.to;
      if (state.currentPage === 1)
        state.filtersProduct = [...action.payload.data];
      else
        state.filtersProduct = [
          ...state.filtersProduct,
          ...action.payload.data,
        ];
      state.currentPage = state.currentPage + 1;
      state.isLoading = false;
      state.isFiltering = false;
      state.isShowMore = false;
    },
    SET_SEARCH_STRING: (state, action) => {
      state.searchString = action.payload;
    },
    SET_SELECTED_CATEGORY: (state, action) => {
      state.selectedCategory = action.payload;
    },
    SET_FILTERS_ARRAY: (state, action) => {
      state.filtersArray = [...action.payload];
    },
    CLEAR_FILTERS_ARRAY: (state, action) => {
      state.filtersArray = filtesArrayOfObject;
    },

    SET_FILTERING_PRODUCTS: (state, action) => {
      state.isFiltering = true;
    },
    SET_IS_SHOW_MORE: state => {
      state.isShowMore = true;
    },
    CLEAR_SEARCH: state => {
      state.searchString = null;
      state.currentPage = 1;
      state.products = [];
    },
    CLEAR_PRODUCTS: state => {
      state.products.splice(12, state.products.length - 12);
      state.currentPage = 2;
    },
    CLEAR_ALL_PRODUCTS: state => {
      state.products = [];
      state.currentPage = 1;
    },
    RESET_PAGE: state => {
      state.currentPage = 1;
    },
    API_ERROR: (state, action) => {
      state.apiError = { ...action.payload };
      state.isLoading = false;
      state.isFiltering = false;
      state.isShowMore = false;
    },
  },
});
export const {
  LOADING,
  SET_PRODUCT_LOADING,
  SET_PRODUCT_CLEAR_LOADING,
  CLEAR_LOADING,
  FETCH_PRODUCTS,
  SET_FILTERS_ARRAY,
  SET_SELECTED_CATEGORY,
  SET_FILTERING_PRODUCTS,
  SET_IS_SHOW_MORE,
  SET_SEARCH_STRING,
  CLEAR_FILTERS_ARRAY,
  FILTER_PRODUCTS,
  CLEAR_PRODUCTS,
  CLEAR_SEARCH,
  CLEAR_ALL_PRODUCTS,
  RESET_PAGE,
  API_ERROR,
} = productSlice.actions;
export default productSlice.reducer;
