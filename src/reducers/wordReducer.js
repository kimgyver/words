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
} from '../actions/types';

const initialState = {
  words: null,
  current: null,
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_WORDS:
      return {
        ...state,
        words: action.payload,
        loading: false
      };
    case ADD_WORD:
      return {
        ...state,
        words: [action.payload, ...state.words],
        loading: false
      };
    case DELETE_WORD:
      return {
        ...state,
        words: state.words.filter(word => word._id !== action.payload),
        loading: false
      };
    case UPDATE_WORD:
      return {
        ...state,
        words: state.words.map(word =>
          word._id === action.payload._id ? action.payload : word
        )
      };
    case SEARCH_WORDS:
      return {
        ...state,
        words: action.payload
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case WORDS_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
