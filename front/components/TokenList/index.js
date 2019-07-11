import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { wrapper } from './index.scss';
import TokenSearchForm from './TokenSearchForm';

const TokenList = () => {
  const [text, setText] = useState('');
  const tokens = useSelector(state => state.token.tokens.data);

  const handleInputChange = useCallback(e => {
    setText(e.target.value);
  });

  return (
    <div className={wrapper}>
      <TokenSearchForm handleChange={handleInputChange} />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Current Price</th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default TokenList;
