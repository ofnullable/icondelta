import React, { memo, useState, useCallback } from 'react';
import { Form, Button, Menu, InputNumber } from 'antd';
import { numberFormatter } from '../utils/formatter';

const TradeForm = memo(() => {
  const [tradeType, setTradeType] = useState('buy');

  const applyTrade = e => e.preventDefault();
  const handleMenuClick = useCallback(
    e => {
      setTradeType(e.key);
    },
    [tradeType]
  );

  return (
    <>
      <Menu
        mode='horizontal'
        onClick={handleMenuClick}
        defaultSelectedKeys={['buy']}
      >
        <Menu.Item key='buy' style={{ width: '50%' }}>
          Buy
        </Menu.Item>
        <Menu.Item key='sell' style={{ width: '50%' }}>
          Sell
        </Menu.Item>
      </Menu>
      <Form onSubmit={applyTrade}>
        <InputNumber
          formatter={numberFormatter}
          style={{ margin: '10px 0 5px', width: '100%' }}
          placeholder='price ( ICX )'
          min={0}
        />
        <InputNumber
          formatter={numberFormatter}
          style={{ margin: '5px 0 10px', width: '100%' }}
          placeholder='amount'
          min={0}
        />
        <Button
          type={tradeType === 'buy' ? 'primary' : 'danger'}
          icon={tradeType === 'buy' ? 'download' : 'upload'}
          block
        >
          {tradeType.toUpperCase()}
        </Button>
      </Form>
    </>
  );
});

export default TradeForm;
