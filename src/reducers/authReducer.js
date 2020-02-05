import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  GET_USERS,
  UPDATE_USER,
  SET_LOADING
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  //loading: true,
  users: null,
  user: null,
  error: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('userid', action.payload.user._id);
      localStorage.setItem('userrole', action.payload.user.role);
      localStorage.setItem('username', action.payload.user.name);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      localStorage.removeItem('userid');
      localStorage.removeItem('userrole');
      localStorage.removeItem('username');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.users.map(user =>
          user._id === action.payload._id ? action.payload : user
        ),
        loading: false
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
