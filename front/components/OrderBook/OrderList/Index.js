import React from 'react';

import { wrapper } from './index.scss';

const OrderList = ({ orders }) => {
  // const
  return (
    <ul className={wrapper}>
      {orders.map((o, i) => (
        <li key={i}>{o.get_amount}</li>
      ))}
    </ul>
  );
};

export default OrderList;
