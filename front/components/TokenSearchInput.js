import React, { memo } from 'react';
import { Input } from 'antd';

const TokenSearchInput = memo(({ setText }) => {
  return (
    <Input.Search
      enterButton
      style={{ verticalAlign: 'middle' }}
      onChange={setText}
    />
  );
});

export default TokenSearchInput;
