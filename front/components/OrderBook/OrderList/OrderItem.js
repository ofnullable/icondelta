import React from 'react';

import { wrapper, sell, buy } from './OrderItem.scss';

const OrderItem = ({ type, order, onClick }) => {
  const renderItem = () => {
    if (type === 'sell') {
      const price = order.getAmount / order.giveAmount;
      const amount = order.giveAmount - order.orderFills;
      return (
        <li className={[wrapper, sell].join(' ')} onClick={onClick}>
          <div>{price}</div>
          <div>{amount}</div>
          <div>{price * amount}</div>
        </li>
      );
    } else {
      const price = order.giveAmount / order.getAmount;
      const amount = order.getAmount - order.orderFills;
      return (
        <li className={[wrapper, buy].join(' ')} onClick={onClick}>
          <div>{price}</div>
          <div>{amount}</div>
          <div>{price * amount}</div>
        </li>
      );
    }
  };

  return renderItem();
};

export default OrderItem;
