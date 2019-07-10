import axios from 'axios';

export const loadOrdersApi = symbol => {
  return axios.get(`/orders/${symbol}`, { withCredentials: true });
};
