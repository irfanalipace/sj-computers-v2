import { LOADING, FETCH_STATES, API_ERROR } from "@store/states/statesSlice";
import { statesApi } from "@api/states";

export const fetchStates = (page = 1) => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOADING, payload: {} });
            const response = await statesApi(page);
            dispatch({ type: FETCH_STATES, payload: response.data });
        } catch (error) {
            console.log("Something went wrong in states", error);
            dispatch({ type: API_ERROR, payload: error?.data?.errors });
        }
    };
};
