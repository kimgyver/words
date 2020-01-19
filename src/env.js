export const serverUrl = () => {
  return process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : process.env.server_url;
};
