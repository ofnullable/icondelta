import React from 'react';
import { useSelector } from 'react-redux';

import { wrapper } from './index.scss';
import OrderList from './OrderList/Index';

const OrderBook = ({ symbol }) => {
  const sellOrders = useSelector(state => state.order.sellOrders);
  const buyOrders = useSelector(state => state.order.buyOrders);

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
      <OrderList sellOrders={sellOrders} buyOrders={buyOrders} />
    </div>
  );
};

export default OrderBook;
