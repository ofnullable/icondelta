import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { wrapper, menu, active } from './index.scss';
import HistoryList from './HistoryList';

const History = ({ symbol }) => {
  const [type, setType] = useState('Trades');
  const histories = useSelector(state => {
    if (type === 'Trades') return state.history.trades;
    else return state.history.orders;
  });

  const handleMenuClick = e => {
    if (e.target.className === active) {
      return;
    }
    setType(e.target.className);
  };

  const renderMenu = () => {
    if (type === 'Trades') {
      return (
        <ul className={menu}>
          <li>Transaction</li>
          <li>Type</li>
          <li>{symbol}</li>
          <li>ICX</li>
          <li>Price</li>
        </ul>
      );
    } else {
      return (
        <ul className={menu}>
          <li>Price</li>
          <li>Available</li>
          <li>Expires in</li>
          <li>Cancel</li>
        </ul>
      );
    }
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
      <div>{renderMenu()}</div>
      {/* type === 'Trades' ? <TradeHistories /> : <OrderHistories /> */}
      <HistoryList type={type} history={histories} />
    </div>
  );
};

export default History;
