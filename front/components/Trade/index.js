import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import TradeForm from './TradeForm';

import { wrapper, active } from './index.scss';

const Trade = () => {
  const [type, setType] = useState('buy');
  const token = useSelector(state => state.token.currentToken);

  const handleMenuClick = e => {
    if (e.target.className === active) {
      return;
    }
    setType(e.target.className);
  };

  return (
    <div className={wrapper}>
      <menu className={type === 'buy' ? active : 'buy'} onClick={handleMenuClick}>
        Buy
      </menu>
      <menu className={type !== 'buy' ? active : 'sell'} onClick={handleMenuClick}>
        Sell
      </menu>
      <TradeForm type={type} token={token} />
    </div>
  );
};

export default Trade;
