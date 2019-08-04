import React, { memo } from 'react';

import TradeHistoryItem from './TradeHistoryItem';
import OrderHistoryItem from './OrderHistoryItem';

import { wrapper, noData } from './index.scss';

const HistoryList = memo(({ type, history }) => {
  const renderItem = () => {
    if (!history.length) {
      return (
        <li className={noData}>
          <img src='/static/images/no-data.svg' />
          <p>No Data</p>
        </li>
      );
    }
    if (type === 'Trades') {
      return history.map((h, i) => <TradeHistoryItem key={i} history={h} />);
    } else {
      return history.map((h, i) => <OrderHistoryItem key={i} history={h} />);
    }
  };

  return <ul className={wrapper}>{renderItem()}</ul>;
});

export default HistoryList;
