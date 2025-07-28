import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const useApi = () => {
  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return api;
};

// Export the API instance directly for non-hook usage
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default useApi;
