import React, { memo, useState } from 'react';
import { useSelector } from 'react-redux';

import TradeModal from '../TradeModal';
import { toIcx } from '../../../utils/formatter';
import { requestTradeEvent } from '../../../utils/event';

import { wrapper, sell, buy, buttons, sellButton, buyButton, cancelButton } from './OrderItem.scss';

const OrderItem = memo(({ type, order }) => {
  const [tradeAmount, setTradeAmount] = useState(order.amount);
  const [modalVisible, setModalVisible] = useState(false);

  const address = useSelector(state => state.wallet.address);

  const handleItemClick = () => {
    setModalVisible(true);
  };

  const handleAmountChange = e => {
    setTradeAmount(e.target.value);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleButtonClick = () => {
    requestTradeEvent(order, { address, amount: tradeAmount });
  };

  const renderModal = type => {
    return (
      <TradeModal visible={modalVisible} setVisible={setModalVisible}>
        <p>{`Maximum amount: ${order.amount}, Price: ${order.price} (per Token)`}</p>
        <label htmlFor='amount'>{`Amount to ${type === 'buy' ? 'sell' : 'buy'}`}</label>
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
        <input id='total' type='number' value={order.total} readOnly />
        <div className={buttons}>
          <button onClick={handleButtonClick} className={type === 'buy' ? sellButton : buyButton}>
            {type === 'buy' ? 'sell' : 'buy'}
          </button>
          <button onClick={handleCloseModal} className={cancelButton}>
            cancel
          </button>
        </div>
      </TradeModal>
    );
  };

  const makeComponent = classes => {
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

  const renderItem = () => {
    const classes = [];

    if (type === 'sell') {
      classes.push(wrapper, sell);
    } else {
      classes.push(wrapper, buy);
    }
    return makeComponent(classes);
  };

  return renderItem();
});

export default OrderItem;
