import {
    LOADING,
    FETCH_STATES,
    UPDATE_STATE,
    API_ERROR,
} from "@store/states/statesSlice";
import { statesApi, updateStateApi } from "@api/states";

export const fetchStates = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOADING, payload: {} });
            const response = await statesApi();
            dispatch({ type: FETCH_STATES, payload: response.data.data });
        } catch (error) {
            console.log("Something went wrong in states", error);
            dispatch({ type: API_ERROR, payload: error?.data?.errors });
        }
    };
};

export const updateState = (data, cb) => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOADING, payload: {} });
            await updateStateApi(data);
            if (typeof cb === "function") cb();
            dispatch({ type: UPDATE_STATE, payload: data.state });
        } catch (error) {
            console.log("Something went wrong in states", error);
            dispatch({ type: API_ERROR, payload: error?.data?.errors });
        }
    };
};
