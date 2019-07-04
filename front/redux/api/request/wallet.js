import axios from 'axios';

export const getAddressApi = () => {
  return axios.get('/address');
};
