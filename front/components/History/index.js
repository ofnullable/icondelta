import React, { useState } from 'react';

import { wrapper, active } from './index.scss';
import HistoryList from './HistoryList';

const History = () => {
  const [type, setType] = useState('Trades');

  const handleMenuClick = e => {
    if (e.target.className === active) {
      return;
    }
    setType(e.target.className);
  };
  return (
    <div className={wrapper}>
      <div>
        <menu className={type === 'Trades' ? active : 'Trades'} onClick={handleMenuClick}>
          Trades
        </menu>
        <menu className={type !== 'Trades' ? active : 'Orders'} onClick={handleMenuClick}>
          Orders
        </menu>
      </div>
      {/* type === 'Trades' ? <TradeHistories /> : <OrderHistories /> */}
      <HistoryList />
    </div>
  );
};

export default History;
