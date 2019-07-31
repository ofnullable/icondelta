import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';

import Balance from '../components/Balance';
import OrderBook from '../components/OrderBook';
import TokenBar from '../components/TokenBar';
import Trade from '../components/Trade';
import History from '../components/History';

import AT from '../redux/actionTypes';
import { SERVER_BASE_URL } from '../utils/const';
import { addIconexEventListner, removeIconexEventListner, eventHandler } from '../utils/event';

import '../styles/index.scss';

const Home = ({ symbol }) => {
  const [sockets, setSockets] = useState();
  const { address } = useSelector(state => state.wallet);
  const dispatch = useDispatch();

  useEffect(() => {
    const handler = eventHandler(dispatch);
    addIconexEventListner(handler);
    return () => removeIconexEventListner(handler);
  }, []);

  useEffect(() => {
    loadWalletData(address);

    console.log(io.managers, sockets);

    const order = io.connect(`${SERVER_BASE_URL}/orders/${symbol}`, {
      transports: ['websocket'],
      forceNew: true,
    });
    const trade = io.connect(`${SERVER_BASE_URL}/trades/${symbol}`, {
      transports: ['websocket'],
      forceNew: true,
    });

    console.log(order, trade);
    setSockets({
      order,
      trade,
    });
    dispatch({
      type: AT.SET_SOCKET,
      data: {
        order,
        trade,
      },
    });

    return () => {
      if (sockets) {
        sockets.order.disconnect();
        sockets.trade.disconnect();
        setSockets(null);
        dispatch({
          type: AT.REMOVE_SOCKET,
        });
        console.log('socket disconnect');
      }
    };
  }, [symbol]);

  useEffect(() => {
    if (sockets) {
      const { order, trade } = sockets;
      order.on('connect', () => {
        order.emit(
          'order_event',
          { event: 'getOrders', params: { type: 'buy', offset: 0, count: 10 } },
          res => {
            console.log('get buy orders', res);
            dispatch({
              type: AT.BUY_ORDER_LIST_RECEIVED,
              data: res.data,
            });
          }
        );
        order.emit(
          'order_event',
          { event: 'getOrders', params: { type: 'sell', offset: 0, count: 10 } },
          res => {
            console.log('get sell orders', res);
            dispatch({
              type: AT.SELL_ORDER_LIST_RECEIVED,
              data: res.data,
            });
          }
        );
        order.on('order_event', data => {
          console.log('broadcasted order', data);
          // dispatch({
          //   type: AT.NEW_ORDER_RECEIVED,
          //   data,
          // });
        });
      });
      trade.on('connect', () => {
        // trade.emit('trade_event', { event: 'getTrades', params: { offset: 0, count: 10 } }, res => {
        //   console.log('get trades', res);
        //   dispatch({
        //     type: AT.TRADE_LIST_RECEIVED,
        //     data: res.data,
        //   });
        // });
        trade.emit('trade_event', { event: 'getLatestTokenTrades', params: {} }, res => {
          console.log('get last token trades', res);
          dispatch({
            type: AT.LAST_TRADE_RECEIVED,
            data: res.data,
          });
        });
        trade.on('trade_event', function(data) {
          console.log('trade event', data);
        });
      });
    }
  }, [sockets]);

  useEffect(() => {
    if (address && sockets) {
      const { order, trade } = sockets;
      order.on('connect', () => {
        order.emit(
          'order_event',
          {
            event: 'getOrdersByAddress',
            params: { type: 'buy', address: address, offset: 0, count: 10 },
          },
          res => {
            console.log('get buy orders by address', res);
            dispatch({
              type: AT.MY_BUY_ORDER_LIST_RECEIVED,
              data: res.data,
            });
          }
        );
        order.emit(
          'order_event',
          {
            event: 'getOrdersByAddress',
            params: { type: 'sell', address: address, offset: 0, count: 10 },
          },
          res => {
            console.log('get sell orders by address', res);
            dispatch({
              type: AT.MY_SELL_ORDER_LIST_RECEIVED,
              data: res.data,
            });
          }
        );
      });
      trade.on('connect', () => {
        trade.emit(
          'trade_event',
          { event: 'getTrades', params: { address: address, offset: 0, count: 10 } },
          res => {
            console.log('get trades by address', res);
            dispatch({
              type: AT.MY_TRADE_LIST_RECEIVED,
              data: res.data,
            });
          }
        );
      });
    }
  }, [address, sockets]);

  const loadWalletData = async address => {
    if (address) {
      dispatch({
        type: AT.LOAD_ICX_BALANCE_REQUEST,
        address,
      });
      dispatch({
        type: AT.LOAD_TOKEN_BALANCE_REQUEST,
        address,
        symbol,
      });
    } else {
      dispatch({
        type: AT.LOAD_ADDRESS_REQUEST,
        symbol,
      });
    }
  };

  return (
    <>
      <Balance symbol={symbol} />
      <OrderBook symbol={symbol} socket={sockets && sockets.trade} />
      <TokenBar symbol={symbol} />
      <Trade socket={sockets && sockets.order} />
      <History symbol={symbol} />
    </>
  );
};

Home.getInitialProps = async context => {
  const store = context.store;
  const symbol = context.query.symbol;

  store.dispatch({
    type: AT.LOAD_TOKEN_LIST_REQUEST,
    symbol,
  });
  store.dispatch({
    type: AT.SET_CURRENT_TOKEN_SYMBOL,
    symbol,
  });

  return { symbol };
};

export default Home;
