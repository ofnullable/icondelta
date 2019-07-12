import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import TradeForm from './TradeForm';

import { wrapper, active } from './index.scss';

const Trade = () => {
  const [type, setType] = useState('Buy');
  const token = useSelector(state => state.token.currentToken.data);

  const handleMenuClick = e => {
    if (e.target.className === active) {
      return;
    }
    setType(e.target.className);
  };

  return (
    <div className={wrapper}>
      <menu className={type === 'Buy' ? active : 'Buy'} onClick={handleMenuClick}>
        Buy
      </menu>
      <menu className={type !== 'Buy' ? active : 'Sell'} onClick={handleMenuClick}>
        Sell
      </menu>
      <TradeForm type={type} token={token} />
    </div>
  );
};

export default Trade;
