import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, Menu, Table } from 'antd';

import BalanceForm from './BalanceForm';
import UserBalance from './UserBalance';

export default () => {
  const [action, setAction] = useState('Deposit');
  const { selectedToken } = useSelector(state => state.tokens);
  // `${selectedToken.symbol}/ICX`

  const changeAction = useCallback(e => {
    setAction(e.key);
  });

  return (
    <Card style={{ marginTop: '10px' }}>
      <Card.Meta title='Balance' />
      <Menu
        style={{ marginTop: '10px' }}
        mode='horizontal'
        onClick={changeAction}
        defaultSelectedKeys={['Deposit']}
      >
        <Menu.Item key='Deposit' style={{ width: '50%' }}>
          Deposit
        </Menu.Item>
        <Menu.Item key='Withdraw' style={{ width: '50%' }}>
          Withdraw
        </Menu.Item>
      </Menu>
      <BalanceForm actionType={action} token={selectedToken} />
      <UserBalance token={selectedToken} />
    </Card>
  );
};
