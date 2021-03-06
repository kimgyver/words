import {
  GET_WORDS,
  SET_LOADING,
  WORDS_ERROR,
  CLEAR_WORDS_ERROR,
  ADD_WORD,
  DELETE_WORD,
  UPDATE_WORD,
  SEARCH_WORDS,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_WORDS,
  CLEAR_FILTER,
  TOGGLE_COLMUN_NUMBER,
  SELECT_CANDIDATES_DICTIONARY,
  SELECT_DICTIONARY,
  CLEAR_DICTIONARY,
  COPY_TO_MINE,
  REMOVE_ORIGINAL_WORDS
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

    console.log(`${serverUrl()}/word?${param}`);
    const res = await fetch(`${serverUrl()}/word?${param}`, {
      headers: {
        method: 'GET',
        'x-auth-token': localStorage.token ? localStorage.token : ''
      }
    });
    const data = await res.json();
    // console.log(data);

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

export const clearWordsError = () => {
  return {
    type: CLEAR_WORDS_ERROR
  };
};

// Add new word
export const addWord = word => async dispatch => {
  try {
    setLoading();

    const res = await fetch(`${serverUrl()}/word`, {
      method: 'POST',
      body: JSON.stringify(word),
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.token ? localStorage.token : ''
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

    const res = await fetch(`${serverUrl()}/word/${_id}`, {
      method: 'DELETE',
      headers: {
        'x-auth-token': localStorage.token ? localStorage.token : ''
      }
    });

    const data = await res.json();
    if (
      data.msg !== null &&
      data.msg !== undefined &&
      data.msg !== 'Word removed'
    ) {
      return dispatch({
        type: WORDS_ERROR,
        payload: data.msg
      });
    }

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

    const res = await fetch(`${serverUrl()}/word/${word._id}`, {
      method: 'PUT',
      body: JSON.stringify(word),
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.token ? localStorage.token : ''
      }
    });

    const data = await res.json();
    if (data.msg !== null && data.msg !== undefined) {
      return dispatch({
        type: WORDS_ERROR,
        payload: data.msg
      });
    }

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

// Copy my word from orignal word
export const copyToMine = word => {
  return {
    type: COPY_TO_MINE
  };
};

// Remove Original words
export const removeOriginalWords = () => {
  return {
    type: REMOVE_ORIGINAL_WORDS
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

// Select candidates Dictionary
export const selectCandidatesDictionary = text => async dispatch => {
  setLoading();

  try {
    const res = await fetch(`https://wordsapiv1.p.rapidapi.com/words/${text}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
        'x-rapidapi-key': '138917d89bmsh539ba95c3187cf1p11aa19jsnc9da532bef6e'
      }
    });
    const json = await res.json();
    console.log('json.results:', json.results);

    dispatch({
      type: SELECT_CANDIDATES_DICTIONARY,
      payload: json.results
    });
  } catch (err) {
    dispatch({
      type: WORDS_ERROR,
      payload: err.response.statusText
    });
  }
};

// Select Dictionary
export const selectDictionary = dictionaries => {
  return {
    type: SELECT_DICTIONARY,
    payload: dictionaries
  };
};

// Clear Dictionary
export const clearDictionary = () => {
  return {
    type: CLEAR_DICTIONARY
  };
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};
