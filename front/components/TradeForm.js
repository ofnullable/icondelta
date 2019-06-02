import React, { memo, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Form, Button, Menu, InputNumber, Input } from 'antd';

import { toCurrency } from '../utils/formatter';

const TradeForm = memo(() => {
  const [tradeType, setTradeType] = useState('buy');
  const [price, setPrice] = useState();
  const [amount, setAmount] = useState();
  const [total, setTotal] = useState();
  const { selectedToken } = useSelector(state => state.tokens);

  const applyTrade = useCallback(e => e.preventDefault());
  const handleMenuClick = useCallback(
    e => {
      setTradeType(e.key);
    },
    [tradeType]
  );

  const changePrice = useCallback(
    e => {
      setPrice(e.target.value);
      if (amount) {
        setTotal(e.target.value * amount);
      }
    },
    [price, amount]
  );
  const changeAmount = useCallback(
    e => {
      setAmount(e.target.value);
      if (price) {
        setTotal(price * e.target.value);
      }
    },
    [price, amount]
  );

  return (
    <>
      <Menu
        style={{ marginBottom: '10px' }}
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
        <Input
          type='number'
          style={{ margin: '10px 0', width: '100%' }}
          placeholder={`Price ( ${selectedToken.symbol}/ICX )`}
          min={0}
          value={price}
          onChange={changePrice}
          addonAfter={`${selectedToken.symbol}`}
        />
        <Input
          style={{ margin: '10px 0', width: '100%' }}
          placeholder='Amount to buy'
          min={0}
          value={amount}
          onChange={changeAmount}
          addonAfter='ICX'
        />
        <InputNumber
          readOnly
          formatter={toCurrency}
          style={{ margin: '10px 0', width: '100%' }}
          placeholder='Total'
          min={0}
          value={total}
        />
        <Button
          style={{ margin: '10px 0' }}
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
