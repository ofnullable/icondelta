import React, { memo } from 'react';

import { wrapper, noData } from './index.scss';
import HistoryItem from './HistoryItem';

const HistoryList = memo(({ history }) => {
  return (
    <ul className={wrapper}>
      {history.length ? (
        history.map((h, i) => <HistoryItem key={i} history={h} />)
      ) : (
        <li className={noData}>
          <img src='/static/images/no-data.svg' />
          <p>No Data</p>
        </li>
      )}
    </ul>
  );
});

export default HistoryList;
