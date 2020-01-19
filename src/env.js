export const serverUrl = () => {
  return process.env.NODE_ENV === 'development'
    ? 'http://localhost:9000/.netlify/functions/api'
    : process.env.server_url;
};
