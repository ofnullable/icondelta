import React from 'react';

import { ICX_ADDRESS } from '../../../utils/const';

import { wrapper, sellOrder, buyOrder } from './OrderItem.scss';

const OrderItem = ({ order }) => {
  return (
    <li className={[wrapper, sellOrder].join(' ')}>
      <div>{price}</div>
      <div>{amount}</div>
      <div>{total}</div>
    </li>
  );
};

export default OrderItem;
