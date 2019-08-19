import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

import TokenSearchForm from './TokenSearchForm';
import TokenList from './TokenList';
import Paginator from './Paginator';

import { wrapper } from './index.scss';

const TokenBar = ({ symbol }) => {
  const [text, setText] = useState('');
  const [page, setPage] = useState(1);

  const tokens = useSelector(state => state.token.tokens.data);

  const getFilterdTokens = () => {
    const endIndex = page * 10;

    if (text) {
      return tokens
        .filter(
          ({ name, symbol }) =>
            (name && name.toLowerCase().includes(text.toLowerCase())) ||
            (symbol && symbol.toLowerCase().includes(text.toLowerCase()))
        )
        .slice(endIndex - 10, endIndex);
    } else {
      return tokens.slice(endIndex - 10, endIndex);
    }
  };

  const handleInputChange = useCallback(e => {
    setText(e.target.value);
  }, []);

  return (
    <div className={wrapper}>
      <TokenSearchForm handleChange={handleInputChange} />
      <TokenList tokens={getFilterdTokens()} symbol={symbol} />
      <Paginator page={page} perPage={10} total={tokens.length - 1 || 1} setPage={setPage} />
    </div>
  );
};

export default TokenBar;
