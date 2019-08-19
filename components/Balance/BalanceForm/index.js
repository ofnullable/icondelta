import React, { useState, memo } from 'react';
import { useSelector } from 'react-redux';

import BalanceInput from './BalanceInput';

import { wrapper, inputGroup, active } from './index.scss';

const Balance = memo(() => {
  const [type, setType] = useState('Deposit');

  const { icx, token } = useSelector(state => state.wallet);
  const { currentToken } = useSelector(state => state.token);

  const handleMenuClick = e => {
    if (e.target.className === active) {
      return;
    }
    setType(e.target.className);
  };

  return (
    <div className={wrapper}>
      <menu className={type === 'Deposit' ? active : 'Deposit'} onClick={handleMenuClick}>
        Deposit
      </menu>
      <menu className={type !== 'Deposit' ? active : 'Withdraw'} onClick={handleMenuClick}>
        Withdraw
      </menu>
      <div className={inputGroup}>
        <BalanceInput type={type} target='ICX' balance={icx} />
        <BalanceInput type={type} target={currentToken} balance={token} />
      </div>
    </div>
  );
});

export default Balance;
