import React from 'react';

import OrderItem from './OrderItem';
import { ICX_ADDRESS } from '../../../utils/const';

import { wrapper } from './index.scss';

const OrderList = ({ orders }) => {
  const sellOrders = orders => {
    let result = [];
    orders.forEach(o => {
      if (o.token_get === ICX_ADDRESS) {
        result.push(o);
      }
    });
    return result;
  };
  const buyOrders = orders => {
    let result = [];
    orders.forEach(o => {
      if (o.token_get !== ICX_ADDRESS) {
        result.push(o);
      }
    });
    return result;
  };
  return (
    <ul className={wrapper}>
      {sellOrders(orders).map(o => (
        <OrderItem key={o.ono} order={o} />
      ))}
      <li>
        <div>symbol</div>
        <div>price</div>
        <div>total</div>
      </li>
      {buyOrders(orders).map(o => (
        <OrderItem key={o.ono} order={o} />
      ))}
    </ul>
  );
};

export default OrderList;
