import axios from 'axios';
import io from 'socket.io-client';
import { SERVER_BASE_URL, ICON_NETWORK_URL } from '../../utils/const';

export const socket = symbol => {
  const order = io.connect(`${SERVER_BASE_URL}/orders/${symbol}`, { transports: ['websocket'] });
  const trade = io.connect(`${SERVER_BASE_URL}/trades`, { transports: ['websocket'] });

  return { order, trade };
};

export const iconApiInstance = () => {
  return axios.create({ baseURL: `${ICON_NETWORK_URL}/api` });
};

export const serverApiInstance = () => {
  return axios.create({ baseURL: SERVER_BASE_URL });
};
