import React from 'react';

import { wrapper } from './HistoryItem.scss';
import { toIcx } from '../../../utils/formatter';
import { TRACKER_BASE_URL } from '../../../utils/const';

const TradeHistoryItem = ({ history }) => {
  const amount = toIcx(history.amount);
  return (
    <li className={wrapper}>
      <div>
        <a href={`${TRACKER_BASE_URL}/transaction/${history.txHash}`} target='_blank'>
          {history.txHash || ''}
        </a>
      </div>
      <div>{history.type}</div>
      <div>{amount}</div>
      <div>{amount * history.icxPrice}</div>
      <div>{history.icxPrice}</div>
    </li>
  );
};

export default TradeHistoryItem;
