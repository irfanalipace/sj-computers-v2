import { combineReducers } from 'redux';
import toggleReducer from '../store/toggle/toggleSlice';

const rootReducer = combineReducers({
  toggle: toggleReducer,
  // Add other reducers here
});

export default rootReducer;
