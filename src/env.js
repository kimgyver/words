export const serverUrl = () => {
  return process.env.NODE_ENV === 'development'
    ? 'http://localhost:9000/.netlify/functions/api'
    : "https://words-backend-jason.herokuapp.com/.netlify/functions/api";
    //: 'https://word-backend-jason.netlify.com/.netlify/functions/api';
};
