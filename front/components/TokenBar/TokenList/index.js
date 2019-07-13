import React, { useEffect } from 'react';

import TokenInfo from './TokenInfo';

import { wrapper } from './index.scss';

const TokenList = ({ tokens, text }) => {
  return (
    <div className={wrapper}>
      <ul>
        <li>
          <div>Name</div>
          <div>Symbol</div>
          <div>Price</div>
        </li>
      </ul>
      <ul>
        {text
          ? tokens
              .filter(({ name, symbol }) => {
                return (
                  name.toLowerCase().includes(text.toLowerCase()) ||
                  symbol.toLowerCase().includes(text.toLowerCase())
                );
              })
              .map(t => <TokenInfo key={t.address} token={t} />)
          : tokens.map(t => <TokenInfo key={t.address} token={t} />)}
      </ul>
    </div>
  );
};

export default TokenList;
