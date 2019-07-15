import React from 'react';
import Link from 'next/link';

import TokenInfo from './TokenInfo';

import { wrapper } from './index.scss';

const TokenList = ({ tokens, symbol }) => {
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
        {tokens.map(t => {
          if (t.symbol === symbol) {
            return <TokenInfo key={t.address} token={t} symbol={symbol} />;
          } else {
            return (
              <Link
                href={{
                  pathname: `/`,
                  query: { symbol: t.symbol },
                }}
                as={`/${t.symbol}`}
                key={t.address}
              >
                <a>
                  <TokenInfo token={t} symbol={symbol} />
                </a>
              </Link>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default TokenList;
