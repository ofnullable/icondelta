import React, { memo } from 'react';

import TradeHistoryItem from './TradeHistoryItem';
import OrderHistoryItem from './OrderHistoryItem';

import { wrapper, noData, loading } from './index.scss';

const HistoryList = memo(({ type, history }) => {
  const renderItem = () => {
    if (history.isProceeding) {
      return (
        <li className={loading}>
          <i className='material-icons'>rotate_right</i>
          <p>Loading...</p>
        </li>
      );
    } else if (!history.data.length) {
      return (
        <li className={noData}>
          <img src='/static/images/no-data.svg' />
          <p>No Data</p>
        </li>
      );
    } else {
      if (type === 'Trades') {
        return history.data.map((h, i) => <TradeHistoryItem key={i} history={h} />);
      } else {
        return history.data.map((h, i) => <OrderHistoryItem key={i} history={h} />);
      }
    }
  };

  return <ul className={wrapper}>{renderItem()}</ul>;
});

export default HistoryList;
