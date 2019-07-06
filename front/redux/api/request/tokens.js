import axios from 'axios';

export const getTokens = () => {
  console.log(axios.defaults);
  return axios.get('/tokens');
};
