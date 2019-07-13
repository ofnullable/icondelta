import React from 'react';
import Link from 'next/link';

const TokenInfo = ({ token }) => {
  return (
    <Link
      href={{
        pathname: `/trade`,
        query: { symbol: token.symbol },
      }}
      as={`/trade/${token.symbol}`}
    >
      <a>
        <li>
          <div width='34%'>{token.name}</div>
          <div width='33%'>{token.symbol}</div>
          <div width='33%'>{token.currentPrice}</div>
        </li>
      </a>
    </Link>
  );
};

export default TokenInfo;
