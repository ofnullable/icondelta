import React from 'react';

const TokenInfo = ({ token, className }) => {
  return (
    <li className={className && className}>
      <div width='34%'>{token.name || 'ST'}</div>
      <div width='33%'>{token.symbol}</div>
      <div width='33%'>{token.currentPrice || '0.9'}</div>
    </li>
  );
};

export default TokenInfo;
