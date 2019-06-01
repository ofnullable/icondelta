import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card } from 'antd';

import TokenSearchInput from './TokenSearchInput';
import TokenList from './TokenList';

const TokenMenu = () => {
  const [searchText, setSearchText] = useState('');
  const { tokenList } = useSelector(state => state.tokens);

  const setText = useCallback(e => {
    setSearchText(e.target.value);
  });

  return (
    <Card
      title={<TokenSearchInput setText={setText} />}
      style={{ marginTop: '10px' }}
      bodyStyle={{ padding: '10px' }}
    >
      <TokenList list={tokenList} searchText={searchText} />
    </Card>
  );
};

export default TokenMenu;
