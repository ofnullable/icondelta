import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

import TokenSearchForm from './TokenSearchForm';
import TokenList from './TokenList';
import Paginator from './Paginator';

import { wrapper } from './index.scss';

const TokenBar = () => {
  const [text, setText] = useState('');
  const [page, setPage] = useState(1);
  const tokens = useSelector(state => state.token.tokens.data);

  const getFilterdTokens = () => {
    const endIndex = page * 10;

    if (text) {
      return tokens
        .filter(
          ({ name, symbol }) =>
            name.toLowerCase().includes(text.toLowerCase()) ||
            symbol.toLowerCase().includes(text.toLowerCase())
        )
        .slice(endIndex - 10, endIndex);
    } else {
      return tokens.slice(endIndex - 10, endIndex);
    }
  };

  const handleInputChange = useCallback(e => {
    setText(e.target.value);
  }, []);

  const handleChange = useCallback(e => {
    if (isValidPage(e.target.value)) setPage(e.target.value);
  }, []);

  const isValidPage = value => {
    if (!value) return false;
    if (isNaN(value)) return false;
    if (value < 1) return false;
    const lastPage = Math.ceil(tokens.length - 1 / 10);
    if (value > lastPage) return false;
    return true;
  };

  return (
    <div className={wrapper}>
      <TokenSearchForm handleChange={handleInputChange} />
      <TokenList tokens={getFilterdTokens()} text={text} />
      <Paginator
        page={page}
        perPage={10}
        total={tokens.length - 1}
        setPage={setPage}
        handleChange={handleChange}
      />
    </div>
  );
};

export default TokenBar;
