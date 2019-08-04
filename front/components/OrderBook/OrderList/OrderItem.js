import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import TradeModal from '../TradeModal';
import { requestTradeEvent } from '../../../utils/event';
import AT from '../../../redux/actionTypes';

import { wrapper, sell, buy, buttons, sellButton, buyButton, cancelButton } from './OrderItem.scss';
import { toBigNumber } from '../../../utils/formatter';

const OrderItem = ({ type, order }) => {
  const [tradeAmount, setTradeAmount] = useState(order.amount);
  const [tradeTotal, setTradeTotal] = useState(order.total);
  const [modalVisible, setModalVisible] = useState(false);

  const { address, icx, token } = useSelector(state => state.wallet);
  const dispatch = useDispatch();

  const handleItemClick = () => {
    if (!address) {
      dispatch({ type: AT.LOAD_ADDRESS_REQUEST });
      return;
    }
    setModalVisible(true);
  };

  const handleAmountChange = e => {
    setTradeAmount(e.target.value);
    setTradeTotal(
      toBigNumber(e.target.value)
        .multipliedBy(order.price)
        .toString()
    );
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleTrade = () => {
    const amount = order.type === 'buy' ? tradeAmount : tradeTotal;
    requestTradeEvent(order, { address, amount });
    setModalVisible(false);
  };

  const renderModal = () => {
    const type = order.type === 'buy' ? 'sell' : 'buy';
    return (
      <TradeModal visible={modalVisible} setVisible={setModalVisible}>
        <p>{`Maximum amount: ${order.amount}, Price: ${order.price} (per Token)`}</p>
        <label htmlFor='amount'>{`Amount to ${type}`}</label>
        <input
          id='amount'
          type='number'
          min={0}
          max={order.amount}
          value={tradeAmount}
          onChange={handleAmountChange}
        />
        <label htmlFor='price'>Price</label>
        <input id='price' type='number' value={order.price} readOnly />
        <label htmlFor='total'>Total</label>
        <input id='total' type='number' value={tradeTotal} readOnly />
        <div className={buttons}>
          <button onClick={handleTrade} className={type === 'buy' ? buyButton : sellButton}>
            {type}
          </button>
          <button onClick={handleCloseModal} className={cancelButton}>
            cancel
          </button>
        </div>
      </TradeModal>
    );
  };

  const renderItem = () => {
    const classes = order.type === 'buy' ? [wrapper, buy] : [wrapper, sell];
    return modalVisible ? (
      <>
        {renderModal(type)}
        <li className={classes.join(' ')} onClick={handleItemClick}>
          <div>{order.price}</div>
          <div>{order.amount}</div>
          <div>{order.total}</div>
        </li>
      </>
    ) : (
      <li className={classes.join(' ')} onClick={handleItemClick}>
        <div>{order.price}</div>
        <div>{order.amount}</div>
        <div>{order.total}</div>
      </li>
    );
  };

  return renderItem();
};

export default OrderItem;
