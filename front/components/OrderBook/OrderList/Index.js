import React, { memo } from 'react';

import OrderItem from './OrderItem';

import { wrapper, noData } from './index.scss';

const OrderList = memo(({ sellOrders, buyOrders }) => {
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
        sellOrders.map((o, i) => <OrderItem key={i} order={o} />),
        buyOrders.map((o, i) => <OrderItem key={i} order={o} />),
      ];
    }
  };

  return <ul className={wrapper}>{renderOrders()}</ul>;
});

export default OrderList;
