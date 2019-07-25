import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { wrapper } from './index.scss';
import OrderList from './OrderList/Index';

const OrderBook = ({ symbol }) => {
  const orderList = useSelector(state => state.order.orders);

  return (
    <div className={wrapper}>
      <div>
        <h1>{`Order Book - ${symbol}`}</h1>
      </div>
      <div>
        <span>{`${symbol} / ICX`}</span>
        <span>{symbol}</span>
        <span>ICX</span>
      </div>
      <OrderList symbol={symbol} orders={orderList.data} />
    </div>
  );
};

export default OrderBook;
