import React, { memo } from 'react';

import { wrapper, noData } from './index.scss';

const HistoryList = memo(({ history }) => {
  const renderHistories = () => {
    if (history.length) {
      return history.map((h, i) => {
        return (
          <li key={i}>
            <div>txHash</div>
            <div>{h.type}</div>
            <div>{h.amount}</div>
            <div>{h.icxPrice}</div>
            <div>{h.amount * h.icxPrice}</div>
          </li>
        );
      });
    } else {
      return (
        <li className={noData}>
          <img src='/static/images/no-data.svg' />
          <p>No Data</p>
        </li>
      );
    }
  };
  return <ul className={wrapper}>{renderHistories()}</ul>;
});

export default HistoryList;
