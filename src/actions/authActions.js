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
} from './types';

import { serverUrl } from '../env';

// Load User
export const loadUser = () => async dispatch => {
  try {
    setLoading();
    const res = await fetch(`${serverUrl()}/auth`, {
      method: 'GET',
      //body: JSON.stringify(word),
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.token ? localStorage.token : null
      }
    });
    const data = await res.json();
    if (data.msg !== null && data.msg !== undefined) {
      return dispatch({
        type: 'AUTH_ERROR'
      });
    }

    dispatch({
      type: USER_LOADED,
      payload: data
    });
  } catch (err) {
    console.log(err);
    dispatch({ type: AUTH_ERROR });
  }
};

// Register User
export const register = formData => async dispatch => {
  try {
    //const res = await axios.post('/api/users', formData, config);
    const res = await fetch(`${serverUrl()}/user`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    if (data.msg !== null && data.msg !== undefined) {
      return dispatch({
        type: REGISTER_FAIL,
        payload: data.msg
      });
    }

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data
    });

    loadUser();
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response.statusText
    });
  }
};

// Login
export const login = userData => async dispatch => {
  try {
    //setLoading();

    const res = await fetch(`${serverUrl()}/auth`, {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    if (data.msg !== null && data.msg !== undefined) {
      return dispatch({
        type: LOGIN_FAIL,
        payload: data.msg
      });
    }

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.statusText
    });
  }
};

// Logout
export const logout = () => {
  return {
    type: LOGOUT
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

// Get User List
export const getUsers = () => async dispatch => {
  try {
    setLoading();
    const res = await fetch(`${serverUrl()}/user?`, {
      headers: {
        method: 'GET',
        'x-auth-token': localStorage.token ? localStorage.token : ''
      }
    });
    const data = await res.json();
    // console.log(data);

    dispatch({
      type: GET_USERS,
      payload: data
    });
  } catch (err) {
    console.log(err);
    console.log(process.env);
    dispatch({
      type: AUTH_ERROR,
      payload: err.response.statusText
    });
  }
};

// Upate user
export const updateUser = user => async dispatch => {
  try {
    setLoading();
    const res = await fetch(`${serverUrl()}/user/${user._id}`, {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.token ? localStorage.token : ''
      }
    });

    const data = await res.json();
    if (data.msg !== null && data.msg !== undefined) {
      return dispatch({
        type: AUTH_ERROR,
        payload: data.msg
      });
    }

    dispatch({
      type: UPDATE_USER,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err.response.statusText
    });
  }
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};
