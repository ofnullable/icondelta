import React from 'react';

import { wrapper, noData } from './index.scss';

const HistoryList = ({ history }) => {
  const renderHistories = () => {
    if (history.length) {
      // TODO: render order item
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
};

export default HistoryList;
