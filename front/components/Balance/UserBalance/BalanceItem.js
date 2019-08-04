import React from 'react';

const BalanceItem = ({ symbol, deposited, undeposited }) => {
  return (
    <li>
      <div>{symbol}</div>
      <div>{undeposited || 0}</div>
      <div>{deposited || 0}</div>
    </li>
  );
};

export default BalanceItem;
