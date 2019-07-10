import React, { useState } from 'react';

import BalanceInput from './BalanceInput';

import { wrapper, active } from './index.scss';

const Balance = ({ address, token }) => {
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
      <BalanceInput address={address} type={type} />
      <BalanceInput address={address} type={type} token={token} />
    </div>
  );
};

export default Balance;
