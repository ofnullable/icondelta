import axios from 'axios';

export const getAddressApi = () => {
  console.log(axios.headers);
  return axios.get('/address');
};

export const sendAddressApi = address => {
  return axios.post('/address', address);
};
