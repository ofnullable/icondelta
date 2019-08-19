import React from 'react';

import TokenInfo from './TokenInfo';

import { wrapper, active } from './index.scss';

const TokenList = ({ tokens, symbol }) => {
  return (
    <div className={wrapper}>
      <ul>
        <li>
          <div>Name</div>
          <div>Symbol</div>
          <div>Price</div>
        </li>
        {tokens.map(t => {
          if (t.symbol === symbol) {
            return <TokenInfo key={t.address} token={t} className={active} />;
          } else {
            return <TokenInfo key={t.address} token={t} />;
          }
        })}
      </ul>
    </div>
  );
};

export default TokenList;
