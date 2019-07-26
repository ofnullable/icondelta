import React from 'react';

import OrderItem from './OrderItem';

import { wrapper, noData } from './index.scss';

const OrderList = ({ sellOrders, buyOrders }) => {
  const renderOrders = (type, orders) => {
    if (!orders.length) {
      return (
        <li className={noData}>
          <img src='/static/images/no-data.svg' />
          <p>No Data</p>
        </li>
      );
    } else {
      return orders.map((o, i) => <OrderItem key={i} type={type} order={o} />);
    }
  };
  return (
    <ul className={wrapper}>
      {renderOrders('sell', sellOrders)}
      {renderOrders('buy', buyOrders)}
    </ul>
  );
};

export default OrderList;
