import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';

import Balance from '../components/Balance';
import OrderBook from '../components/OrderBook';
import TokenBar from '../components/TokenBar';
import Trade from '../components/Trade';
import History from '../components/History';

import AT from '../redux/actionTypes';
import { addIconexEventListner, removeIconexEventListner, eventHandler } from '../utils/event';

import '../styles/index.scss';

const BASE_URL = 'wss://api.icondelta.ga';

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

    setSockets({
      order: io(`${BASE_URL}/orders/${symbol}`),
      trade: io(`${BASE_URL}/trades`),
    });
    dispatch({
      type: AT.SET_SOCKET,
      data: {
        order: io(`${BASE_URL}/orders/${symbol}`),
        trade: io(`${BASE_URL}/trades`),
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
        order.emit('getOrders', { type: 'buy', offset: 0, count: 10 }, res => {
          console.log('get orders', res);
        });
        order.on('order_event', data => {
          console.log(data);
        });
      });
      trade.on('connect', () => {
        trade.emit('getTrades', { offset: 0, count: 10 }, res => {
          console.log('get trades', res);
        });
        trade.emit('getLatestTokenTrades', res => {
          console.log('get last token trades', res);
        });
      });
    }
  }, [sockets]);

  useEffect(() => {
    if (address && sockets) {
      const { order, trade } = sockets;
      order.on('connect', () => {
        order.emit('getOrders', { type: 'buy', address: address, offset: 0, count: 10 }, res => {
          console.log('get orders by address', res);
        });
      });
      trade.on('connect', () => {
        trade.emit('getTrades', { address: address, offset: 0, count: 10 }, res => {
          console.log('get trades by address', res);
        });
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
      <Balance />
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

  return { symbol };
};

export default Home;
