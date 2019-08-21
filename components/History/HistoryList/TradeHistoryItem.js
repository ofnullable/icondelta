import React from 'react';

import { toIcx, toBigNumber } from '../../../utils/formatter';
import { TRACKER_BASE_URL } from '../../../utils/const';

import { wrapper, buy, sell } from './HistoryItem.scss';

const TradeHistoryItem = ({ history }) => {
  const amount = toIcx(history.amount);
  const price = toBigNumber(amount)
    .multipliedBy(history.icxPrice)
    .toNumber();
  return (
    <li className={wrapper}>
      <div>
        <a href={`${TRACKER_BASE_URL}/transaction/${history.txHash}`} target='_blank'>
          {history.txHash || ''}
        </a>
      </div>
      <div className={history.type === 'buy' ? buy : sell}>{history.type}</div>
      <div>{amount}</div>
      <div>{price}</div>
      <div>{history.icxPrice}</div>
    </li>
  );
};

export default TradeHistoryItem;
