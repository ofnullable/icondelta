import React from 'react';

import { ICX_ADDRESS } from '../../../utils/const';

import { wrapper, sellOrder, buyOrder } from './OrderItem.scss';

const OrderItem = ({ order }) => {
  const renderItem = order => {
    if (order.token_get === ICX_ADDRESS) {
      const price = (order.get_amount - order.order_fills) / order.give_amount;
      const total = order.get_amount - order.order_fills;
      const amount = total / price;
      return (
        <li className={[wrapper, sellOrder].join(' ')}>
          <div>{amount}</div>
          <div>{price}</div>
          <div>{total}</div>
        </li>
      );
    } else {
      const amount = order.get_amount - order.order_fills;
      const price = order.give_amount / order.get_amount;
      return (
        <li className={[wrapper, buyOrder].join(' ')}>
          <div>{amount}</div>
          <div>{price}</div>
          <div>{amount * price}</div>
        </li>
      );
    }
  };

  return renderItem(order);
};

export default OrderItem;
