import React from 'react';

import { wrapper } from './HistoryItem.scss';
import { toIcx } from '../../../utils/formatter';

const TradeHistoryItem = ({ history }) => {
  const amount = toIcx(history.amount);
  return (
    <li className={wrapper}>
      <div>{history.txHash || ''}</div>
      <div>{history.type}</div>
      <div>{amount}</div>
      <div>{amount * history.icxPrice}</div>
      <div>{history.icxPrice}</div>
    </li>
  );
};

export default TradeHistoryItem;
