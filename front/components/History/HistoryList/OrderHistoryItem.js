import React from 'react';

import { wrapper } from './HistoryItem.scss';

const OrderHistoryItem = ({ history }) => {
  return (
    <li className={wrapper}>
      <div>{history.price}</div>
      <div>{history.amount}</div>
      <div>{history.expires || 0}</div>
      <div>{``}</div>
    </li>
  );
};

export default OrderHistoryItem;
