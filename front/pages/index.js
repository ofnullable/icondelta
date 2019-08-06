import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Balance from '../components/Balance';
import OrderBook from '../components/OrderBook';
import TokenBar from '../components/TokenBar';
import Trade from '../components/Trade';
import History from '../components/History';

import AT from '../redux/actionTypes';
import { socket } from '../redux/api/config';
import { addIconexEventListner, removeIconexEventListner, eventHandler } from '../utils/event';

const Home = ({ symbol }) => {
  const { address } = useSelector(state => state.wallet);
  const { sockets } = useSelector(state => state.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    const handler = eventHandler(dispatch);
    addIconexEventListner(handler);
    return () => removeIconexEventListner(handler);
  }, []);

  useEffect(() => {
    loadWalletData();

    dispatch({
      type: AT.SET_SOCKET,
      data: socket(symbol),
    });
    return () => {
      console.log(sockets);
      if (sockets) {
        const { order, trade } = sockets;
        order.close();
        trade.close();
        dispatch({
          type: AT.REMOVE_SOCKET,
        });
        console.log('socket disconnected');
      }
    };
  }, [symbol]);

  useEffect(() => {
    if (sockets) {
      const { order, trade } = sockets;
      order.emit('order_event', { event: 'getOrders', params: { offset: 0, count: 10 } }, res => {
        console.log('get orders', res);
        if (res && res.success)
          dispatch({
            type: AT.ORDER_LIST_RECEIVED,
            data: res.data,
          });
      });

      order.on('order_event', res => {
        console.log('broadcasted order', res);
        dispatch({
          type: AT.NEW_ORDER_RECEIVED,
          data: res,
        });
      });

      trade.emit('trade_event', { event: 'getLatestTokenTrades', params: {} }, res => {
        console.log('get last token trades', res);
        if (res && res.success)
          dispatch({
            type: AT.LAST_TRADE_RECEIVED,
            data: res.data,
          });
      });
      trade.on('trade_event', res => {
        console.log('trade event', res);
        loadWalletData(address);
        dispatch({
          type: AT.SET_TOKEN_PRICE,
          data: res,
        });
      });
      // trade.emit('trade_event', { event: 'getTrades', params: { offset: 0, count: 10 } }, res => {
      //   console.log('get trades', res);
      //   dispatch({
      //     type: AT.TRADE_LIST_RECEIVED,
      //     data: res.data,
      //   });
      // });
    }
  }, [sockets]);

  useEffect(() => {
    console.log(address, sockets);

    if (address && sockets) {
      const { order, trade } = sockets;
      order.emit(
        'order_event',
        {
          event: 'getOrdersByAddress',
          params: { address, offset: 0, count: 10 },
        },
        res => {
          console.log('get orders by address', res);
          if (res && res.success)
            dispatch({
              type: AT.MY_ORDER_LIST_RECEIVED,
              data: res.data,
            });
        }
      );
      trade.emit(
        'trade_event',
        { event: 'getTradesByAddress', params: { address, offset: 0, count: 10 } },
        res => {
          console.log('get trades by address', res);
          if (res && res.success)
            dispatch({
              type: AT.MY_TRADE_LIST_RECEIVED,
              data: res.data,
            });
        }
      );
    }
  }, [address, sockets]);

  const loadWalletData = () => {
    if (address) {
      dispatch({
        type: AT.LOAD_WALLET_BALANCE_REQEUST,
        address,
        symbol,
      });
    } else {
      dispatch({
        type: AT.LOAD_ADDRESS_REQUEST,
      });
    }
  };

  return (
    <main>
      <Balance symbol={symbol} />
      <OrderBook symbol={symbol} />
      <TokenBar symbol={symbol} />
      <Trade />
      <History symbol={symbol} />
    </main>
  );
};

Home.getInitialProps = async context => {
  const store = context.store;
  const symbol = context.query.symbol;
  store.dispatch({
    type: AT.LOAD_TOKEN_LIST_REQUEST,
    symbol,
  });

  return { symbol };
};

export default Home;
