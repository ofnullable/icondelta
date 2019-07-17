import React from 'react';
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
      <OrderList symbol={symbol} orders={orderList.data} />
    </div>
  );
};

export default OrderBook;
