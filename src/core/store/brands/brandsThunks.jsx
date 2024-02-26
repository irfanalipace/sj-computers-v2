import { LOADING, FETCH_BRANDS, API_ERROR } from '@store/brands/brandsSlice';
import { brandsApi } from '@api/brands';

export const fetchBrands = () => {
  return async dispatch => {
    try {
      dispatch({ type: LOADING, payload: {} });
      const response = await brandsApi();
      dispatch({ type: FETCH_BRANDS, payload: response.data });
    } catch (error) {
      console.print('Something went wrong in brands', error);
      dispatch({ type: API_ERROR, payload: error?.data?.errors });
    }
  };
};
