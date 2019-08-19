import React from 'react';

const BalanceItem = ({ symbol, deposited, undeposited }) => {
  return (
    <li>
      <div>{symbol}</div>
      <div>{undeposited}</div>
      <div>{deposited}</div>
    </li>
  );
};

export default BalanceItem;
