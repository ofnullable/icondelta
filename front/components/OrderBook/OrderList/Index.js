import React from 'react';

import OrderItem from './OrderItem';
import { ICX_ADDRESS } from '../../../utils/const';

import { wrapper } from './index.scss';

const OrderList = ({ symbol, orders }) => {
  return (
    <ul className={wrapper}>
      <li>
        <div>{`${symbol} / ICX`}</div>
        <div>{symbol}</div>
        <div>ICX</div>
      </li>
    </ul>
  );
};

export default OrderList;
