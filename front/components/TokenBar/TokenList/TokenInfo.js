import React from 'react';

const TokenInfo = ({ token, className }) => {
  return (
    <li className={className && className}>
      <div width='34%'>{token.name}</div>
      <div width='33%'>{token.symbol}</div>
      <div width='33%'>{token.currentPrice}</div>
    </li>
  );
};

export default TokenInfo;
