import React from 'react';

import { active } from './index.scss';

const TokenInfo = ({ token, symbol }) => {
  return (
    <li className={symbol === token.symbol ? active : ''}>
      <div width='34%'>{token.name}</div>
      <div width='33%'>{token.symbol}</div>
      <div width='33%'>{token.currentPrice}</div>
    </li>
  );
};

export default TokenInfo;
