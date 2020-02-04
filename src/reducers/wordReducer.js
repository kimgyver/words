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
  REMOVE_ORIGINAL_WORDS
} from '../actions/types';

const MAX_COLUMN_NUMBER = 4;

const initialState = {
  words: null,
  current: null,
  loading: false,
  error: null,
  filtered: null,
  filterString: null,
  columnNumber: 3,
  candidatesDictionaries: null,
  dictionaries: null
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
        filtered: state.filtered ? [action.payload, ...state.filtered] : null,
        loading: false
      };
    case DELETE_WORD:
      return {
        ...state,
        words: state.words.filter(word => word._id !== action.payload),
        filtered: state.filtered
          ? state.filtered.filter(word => word._id !== action.payload)
          : null,
        loading: false
      };
    case UPDATE_WORD:
      return {
        ...state,
        words: state.words.map(word =>
          word._id === action.payload._id ? action.payload : word
        ),
        filtered: state.filtered
          ? state.filtered.map(word =>
              word._id === action.payload._id ? action.payload : word
            )
          : null
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

    case REMOVE_ORIGINAL_WORDS:
      if (localStorage.userrole === 'Admin') {
        // do nothing
        return {
          ...state
        };
      }

      const origins = state.words.map(w => w.origins).flat(Infinity);
      return {
        ...state,
        words: state.words.filter(
          word =>
            (word.owner !== null && word.owner !== undefined
              ? word.owner._id === localStorage.userid
              : false) ||
            origins.reduce((acc, o) => acc && o !== word._id, true)
        ),
        filtered: state.filtered
          ? state.filtered.filter(
              word =>
                (word.owner !== null && word.owner !== undefined
                  ? word.owner._id === localStorage.userid
                  : false) ||
                origins.reduce((acc, o) => acc && o !== word._id, true)
            )
          : null
      };

    case FILTER_WORDS:
      return {
        ...state,
        filterString: action.payload,
        filtered: state.words.filter(word => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return (
            word.text.match(regex) ||
            word.definition.match(regex) ||
            word.synonyms.match(regex) ||
            word.examples.reduce(
              (prevMatched, example) => prevMatched || example.match(regex),
              false
            )
          );
        }),
        loading: false
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filterString: null,
        filtered: null
      };
    case TOGGLE_COLMUN_NUMBER:
      return {
        ...state,
        columnNumber:
          state.columnNumber < MAX_COLUMN_NUMBER ? state.columnNumber + 1 : 1
      };
    case SELECT_CANDIDATES_DICTIONARY:
      return {
        ...state,
        candidatesDictionaries: action.payload,
        loading: false
      };
    case SELECT_DICTIONARY:
      return {
        ...state,
        dictionaries: action.payload,
        loading: false
      };
    case CLEAR_DICTIONARY:
      return {
        ...state,
        dictionaries: null
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
    case CLEAR_WORDS_ERROR:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};
