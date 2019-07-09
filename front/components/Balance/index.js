import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import BalanceInput from './BalanceInput';

import { wrapper, active } from './index.scss';

const Balance = () => {
  const token = useSelector(state => state.token.currentToken.data);

  const [type, setType] = useState('Deposit');

  const handleMenuClick = e => {
    setType(e.target.innerText);
  };

  return (
    <div className={wrapper}>
      <menu className={type === 'Deposit' ? active : ''} onClick={handleMenuClick}>
        Deposit
      </menu>
      <menu className={type !== 'Deposit' ? active : ''} onClick={handleMenuClick}>
        Withdraw
      </menu>
      <BalanceInput type={type} />
      <BalanceInput type={type} token={token} />
    </div>
  );
};

export default Balance;
