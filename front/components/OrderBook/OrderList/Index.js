import React from 'react';

import OrderItem from './OrderItem';

import { wrapper, noData } from './index.scss';

const OrderList = ({ symbol, orders }) => {
  const renderOrders = () => {
    if (orders.length) {
      // TODO: render order item
    } else {
      return (
        <li className={noData}>
          <img src='/static/images/no-data.svg' />
          <p>No Data</p>
        </li>
      );
    }
  };
  return (
    <ul className={wrapper}>
      <li>
        <div>{`${symbol} / ICX`}</div>
        <div>{symbol}</div>
        <div>ICX</div>
      </li>
      {renderOrders()}
    </ul>
  );
};

export default OrderList;
