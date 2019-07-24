import React from 'react';

import { wrapper } from './index.scss';

const HistoryList = ({ type }) => {
  return <ul className={wrapper}>{type} History</ul>;
};

export default HistoryList;
