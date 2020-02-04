import { combineReducers } from 'redux';
import wordReducer from './wordReducer';
import authReducer from './authReducer';

export default combineReducers({
  word: wordReducer,
  auth: authReducer
});
