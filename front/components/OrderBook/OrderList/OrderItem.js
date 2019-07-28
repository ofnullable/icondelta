import React, { useState } from 'react';

import TradeModal from '../../common/TradeModal';

import { wrapper, sell, buy } from './OrderItem.scss';

const OrderItem = ({ type, order }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleItemClick = () => {
    setModalVisible(true);
  };

  const makeComponent = (price, amount, classes) => {
    return modalVisible ? (
      <>
        <TradeModal visible={modalVisible} setVisible={setModalVisible}>
          <label for='amount'>{`Amount to ${type}`}</label>
          <input id='amount' type='number' max={amount} value={amount} />
          <label for='price'>Price</label>
          <input id='price' type='number' value={price} readOnly />
          <div>{order.orderDate}</div>
        </TradeModal>
        <li className={classes.join(' ')} onClick={handleItemClick}>
          <div>{price}</div>
          <div>{amount}</div>
          <div>{price * amount}</div>
        </li>
      </>
    ) : (
      <li className={classes.join(' ')} onClick={handleItemClick}>
        <div>{price}</div>
        <div>{amount}</div>
        <div>{price * amount}</div>
      </li>
    );
  };

  const renderItem = () => {
    if (type === 'sell') {
      const price = order.getAmount / order.giveAmount;
      const amount = order.giveAmount - order.orderFills;
      return makeComponent(price, amount, [wrapper, sell]);
    } else {
      const price = order.giveAmount / order.getAmount;
      const amount = order.getAmount - order.orderFills;
      return makeComponent(price, amount, [wrapper, buy]);
    }
  };

  return renderItem();
};

export default OrderItem;
