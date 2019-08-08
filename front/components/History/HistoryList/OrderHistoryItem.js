import React from 'react';

import { wrapper, buy, sell } from './HistoryItem.scss';

const OrderHistoryItem = ({ history }) => {
  return (
    <li className={wrapper}>
      <div>{history.price}</div>
      <div className={history.type === 'buy' ? buy : sell}>{history.type}</div>
      <div>{history.amount}</div>
      <div>{history.expires || 0}</div>
    </li>
  );
};

export default OrderHistoryItem;
