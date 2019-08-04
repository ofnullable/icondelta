import io from 'socket.io-client';
import { SERVER_BASE_URL } from '../../../utils/const';

export default symbol => {
  const order = io.connect(`${SERVER_BASE_URL}/orders/${symbol}`, { transports: ['websocket'] });
  const trade = io.connect(`${SERVER_BASE_URL}/trades/${symbol}`, { transports: ['websocket'] });

  return { order, trade };
};
