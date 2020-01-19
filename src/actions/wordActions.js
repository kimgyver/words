import {
  GET_WORDS,
  SET_LOADING,
  WORDS_ERROR,
  ADD_WORD,
  DELETE_WORD,
  UPDATE_WORD,
  SEARCH_WORDS,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_WORDS,
  CLEAR_FILTER,
  TOGGLE_COLMUN_NUMBER
} from './types';

import { serverUrl } from '../env';

// export const getWords = () => {
//     return async (dispatch) => {
//         setLoading();

//         const res = await fetch('/words');
//         const data = await res.json();

//         dispatch({
//             type: GET_WORDS,
//             payload: data
//         });
//     };
// }

// Get words from server
export const getWords = () => async dispatch => {
  try {
    setLoading();

    let param = '';
    let savedSetting = localStorage.getItem('wordOrderSetting');
    if (savedSetting !== null) {
      savedSetting = JSON.parse(savedSetting);
      if (savedSetting.randomOrder) {
        param = 'random=true';
      } else {
        if (savedSetting.order1 !== null && savedSetting.order1 !== '') {
          param += `order1=${savedSetting.order1}&`;
        }
        if (savedSetting.order2 !== null && savedSetting.order2 !== '') {
          param += `order2=${savedSetting.order2}&`;
        }
        if (savedSetting.order3 !== null && savedSetting.order3 !== '') {
          param += `order3=${savedSetting.order3}`;
        }
      }
    }

    console.log(`${serverUrl()}/api/words?${param}`);
    const res = await fetch(`${serverUrl()}/api/words?${param}`);
    const data = await res.json();

    dispatch({
      type: GET_WORDS,
      payload: data
    });
  } catch (err) {
    console.log(err);
    console.log(process.env);
    dispatch({
      type: WORDS_ERROR,
      payload: err.response.statusText
    });
  }
};

// Add new word
export const addWord = word => async dispatch => {
  try {
    setLoading();

    const res = await fetch(`${serverUrl()}/api/words`, {
      method: 'POST',
      body: JSON.stringify(word),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();

    dispatch({
      type: ADD_WORD,
      payload: data.word
    });
  } catch (err) {
    dispatch({
      type: WORDS_ERROR,
      payload: err.response.statusText
    });
  }
};

// Delete word from server
export const deleteWord = _id => async dispatch => {
  try {
    setLoading();

    await fetch(`${serverUrl()}/api/words/${_id}`, {
      method: 'DELETE'
    });

    dispatch({
      type: DELETE_WORD,
      payload: _id
    });
  } catch (err) {
    dispatch({
      type: WORDS_ERROR,
      payload: err.response.statusText
    });
  }
};

// Upate word from server
export const updateWord = word => async dispatch => {
  try {
    setLoading();

    const res = await fetch(`${serverUrl()}/api/words/${word._id}`, {
      method: 'PUT',
      body: JSON.stringify(word),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await res.json();

    dispatch({
      type: UPDATE_WORD,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: WORDS_ERROR,
      payload: err.response.statusText
    });
  }
};

// Search server words
export const searchWords = text => async dispatch => {
  try {
    setLoading();

    const res = await fetch(`/words?q=${text}`);
    const data = await res.json();

    dispatch({
      type: SEARCH_WORDS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: WORDS_ERROR,
      payload: err.response.statusText
    });
  }
};

// Set current word
export const setCurrent = word => {
  return {
    type: SET_CURRENT,
    payload: word
  };
};

// Clear current word
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT
  };
};

// Filter words
export const filterWords = filter => {
  return {
    type: FILTER_WORDS,
    payload: filter
  };
};

// Clear filter
export const clearFilter = () => {
  return {
    type: CLEAR_FILTER
  };
};

// Toggle Column number
export const toggleColumnNumber = () => {
  return {
    type: TOGGLE_COLMUN_NUMBER
  };
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};
