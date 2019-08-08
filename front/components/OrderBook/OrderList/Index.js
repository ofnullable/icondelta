import React, { memo } from 'react';

import OrderItem from './OrderItem';

import { wrapper, noData, loading } from './index.scss';

const OrderList = memo(({ sellOrders, buyOrders }) => {
  const renderOrders = () => {
    if (sellOrders.isProceeding) {
      return (
        <li className={loading}>
          <i className='material-icons'>rotate_right</i>
          <p>Loading...</p>
        </li>
      );
    } else if (!sellOrders.data.length && !buyOrders.data.length) {
      return (
        <li className={noData}>
          <img src='/static/images/no-data.svg' />
          <p>No Data</p>
        </li>
      );
    } else {
      return [
        sellOrders.data.map((o, i) => <OrderItem key={i} order={o} />),
        buyOrders.data.map((o, i) => <OrderItem key={i} order={o} />),
      ];
    }
  };

  return <ul className={wrapper}>{renderOrders()}</ul>;
});

export default OrderList;
