import React, { memo, useState } from 'react';
import { useSelector } from 'react-redux';

import TradeModal from '../TradeModal';

import { wrapper, sell, buy } from './OrderItem.scss';
import { toIcx, toHexLoop } from '../../../utils/formatter';
import { requestTradeEvent } from '../../../utils/event';

const getPrice = (type, order) => {
  // console.log('getPrice', order);
  return type === 'sell' ? order.getAmount / order.giveAmount : order.giveAmount / order.getAmount;
};

const getAmount = (type, order) => {
  // console.log('getAmount', order);
  return type === 'sell'
    ? toIcx(order.giveAmount - (order.orderFills || 0))
    : toIcx(order.getAmount - (order.orderFills || 0));
};

const getTotal = (type, order) => {
  // console.log('getTotal', order);
  return getPrice(type, order) * getAmount(type, order);
};

const OrderItem = memo(({ type, order }) => {
  const [price, setPrice] = useState(getPrice(type, order));
  const [amount, setAmount] = useState(getAmount(type, order));
  const [total, setTotal] = useState(getTotal(type, order));
  const [tradeAmount, setTradeAmount] = useState(amount);
  const [modalVisible, setModalVisible] = useState(false);

  const address = useSelector(state => state.wallet.address);

  const handleItemClick = () => {
    setModalVisible(true);
  };

  const handleAmountChange = e => {
    setTradeAmount(e.target.value);
  };

  const handleButtonClick = () => {
    requestTradeEvent(order, { address, amount: tradeAmount });
  };

  const renderModal = (type, price, amount) => {
    return (
      <TradeModal visible={modalVisible} setVisible={setModalVisible}>
        <b>Order</b>
        <span>d</span>
        <label htmlFor='amount'>{`Amount to ${type === 'buy' ? 'sell' : 'buy'}`}</label>
        <input
          id='amount'
          type='number'
          min={0}
          max={amount}
          value={tradeAmount}
          onChange={handleAmountChange}
        />
        <label htmlFor='price'>Price</label>
        <input id='price' type='number' value={price} readOnly />
        <div>{order.orderDate}</div>
        <button onClick={handleButtonClick}>{type === 'buy' ? 'sell' : 'buy'}</button>
      </TradeModal>
    );
  };

  const makeComponent = (price, amount, classes) => {
    return modalVisible ? (
      <>
        {renderModal(type, price, amount)}
        <li className={classes.join(' ')} onClick={handleItemClick}>
          <div>{price}</div>
          <div>{amount}</div>
          <div>{total}</div>
        </li>
      </>
    ) : (
      <li className={classes.join(' ')} onClick={handleItemClick}>
        <div>{price}</div>
        <div>{amount}</div>
        <div>{total}</div>
      </li>
    );
  };

  const renderItem = () => {
    const classes = [];

    if (type === 'sell') {
      classes.push(wrapper, sell);
    } else {
      classes.push(wrapper, buy);
    }
    return makeComponent(price, amount, classes);
  };

  return renderItem();
});

export default OrderItem;
