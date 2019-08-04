import React from 'react';
import Router from 'next/router';

const TokenInfo = ({ token, className }) => {
  const handleItemClick = () => {
    if (!className) {
      Router.push({ pathname: '/', query: { symbol: token.symbol } }, `/${token.symbol}`);
    }
  };
  return (
    <li className={className && className} onClick={handleItemClick}>
      <div width='34%'>{token.fullName}</div>
      <div width='33%'>{token.symbol}</div>
      <div width='33%'>{token.currentPrice || '0.9'}</div>
    </li>
  );
};

export default TokenInfo;
