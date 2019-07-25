import React from 'react';

import { ICX_ADDRESS } from '../../../utils/const';

import { wrapper } from './OrderItem.scss';

const OrderItem = ({ order }) => {
  // TODO: show, hide modal for click event
  return (
    <li className={wrapper}>
      <div>{price}</div>
      <div>{amount}</div>
      <div>{total}</div>
    </li>
  );
};

export default OrderItem;
