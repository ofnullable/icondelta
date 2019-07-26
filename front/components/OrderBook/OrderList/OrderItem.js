import React from 'react';

import { wrapper, sell, buy } from './OrderItem.scss';

const OrderItem = ({ type, order }) => {
  // TODO: show, hide modal for click event

  const renderItem = () => {
    if (type === 'sell') {
      const price = order.getAmount / order.giveAmount;
      const amount = order.giveAmount - order.orderFills;
      return (
        <li className={[wrapper, sell].join(' ')}>
          <div>{price}</div>
          <div>{amount}</div>
          <div>{price * amount}</div>
        </li>
      );
    } else {
      const price = order.giveAmount / order.getAmount;
      const amount = order.getAmount - order.orderFills;
      return (
        <li className={[wrapper, buy].join(' ')}>
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
