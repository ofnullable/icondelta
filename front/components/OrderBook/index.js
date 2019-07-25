import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { wrapper } from './index.scss';
import OrderList from './OrderList/Index';

const OrderBook = ({ symbol, socket }) => {
  const orderList = useSelector(state => state.order.orders);

  useEffect(() => {
    console.log(socket);
    if (socket) {
      const { order } = socket;
      order.on('connect', () => {
        console.log(`socket connect!`);

        order.emit('getOrders', { type: 'buy', offset: 0, count: 10 }, res => {
          console.log(res);
        });
      });
    }
  }, [socket]);

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
