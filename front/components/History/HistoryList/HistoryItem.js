import React from 'react';

import { wrapper } from './HistoryItem.scss';
import { toIcx } from '../../../utils/formatter';

const HistoryItem = ({ history }) => {
  const amount = toIcx(history.amount);
  return (
    <li className={wrapper}>
      <div>{history.txHash || ''}</div>
      <div>{history.type}</div>
      <div>{amount}</div>
      <div>{history.icxPrice}</div>
      <div>{amount * history.icxPrice}</div>
    </li>
  );
};

export default HistoryItem;
