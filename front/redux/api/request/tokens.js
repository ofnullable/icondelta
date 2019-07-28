import axios from 'axios';

export const loadTokensApi = () => {
  return axios.get('/tokens');
};
