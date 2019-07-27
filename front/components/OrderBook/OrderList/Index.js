import React, { useState } from 'react';

import OrderItem from './OrderItem';

import { wrapper, noData } from './index.scss';
import Modal from '../../common/Modal';

const OrderList = ({ sellOrders, buyOrders }) => {
  const [modalVisible, setModalVisible] = useState(true);

  const handleItemClick = order => e => {
    setModalVisible(true);
  };

  const renderOrders = () => {
    if (!sellOrders.length && !buyOrders.length) {
      return (
        <li className={noData}>
          <img src='/static/images/no-data.svg' />
          <p>No Data</p>
        </li>
      );
    } else {
      return [
        sellOrders.map((o, i) => (
          <OrderItem key={i} type='sell' order={o} onClick={handleItemClick(o)} />
        )),
        buyOrders.map((o, i) => (
          <OrderItem key={i} type='buy' order={o} onClick={handleItemClick(o)} />
        )),
      ];
    }
  };
  return (
    <ul className={wrapper}>
      <Modal visible={modalVisible} setVisible={setModalVisible} />
      {renderOrders()}
    </ul>
  );
};

export default OrderList;
