import React, { useState } from 'react';

import BalanceInput from './BalanceInput';

import { wrapper, active } from './index.scss';

const Balance = ({ address, token }) => {
  const [type, setType] = useState('Deposit');

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
      <BalanceInput address={address} type={type} token={'ICX'} />
      <BalanceInput address={address} type={type} token={token} />
    </div>
  );
};

export default Balance;
