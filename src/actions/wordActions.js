import {
  GET_WORDS,
  SET_LOADING,
  WORDS_ERROR,
  ADD_WORD,
  DELETE_WORD,
  UPDATE_WORD,
  SEARCH_WORDS,
  SET_CURRENT,
  CLEAR_CURRENT
} from './types';

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

    const res = await fetch('http://localhost:5000/api/words');
    const data = await res.json();

    dispatch({
      type: GET_WORDS,
      payload: data
    });
  } catch (err) {
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

    const res = await fetch('http://localhost:5000/api/words', {
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

    await fetch(`http://localhost:5000/api/words/${_id}`, {
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

    const res = await fetch(`http://localhost:5000/api/words/${word._id}`, {
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

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};
