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

const BASE_URL = 'https://api.icondelta.ga';

const getOrdersResponse = {
  data: [
    {
      signature: '0x0',
      tokenGet: 'cx~',
      getAmount: 10,
      tokenGive: 'cx~',
      giveAmount: 100,
      nonce: 0,
      makerAddress: 'hx~',
      orderFills: 0,
      expireBlock: 10,
      orderDatea: 20190720,
    },
    {
      signature: '0x1',
      tokenGet: 'cx~',
      getAmount: 10,
      tokenGive: 'cx~',
      giveAmount: 100,
      nonce: 0,
      makerAddress: 'hx~',
      orderFills: 0,
      expireBlock: 10,
      orderDatea: 20190720,
    },
    {
      signature: '0x2',
      tokenGet: 'cx~',
      getAmount: 10,
      tokenGive: 'cx~',
      giveAmount: 100,
      nonce: 0,
      makerAddress: 'hx~',
      orderFills: 0,
      expireBlock: 10,
      orderDatea: 20190720,
    },
  ],
};

const getTradesResponse = { data: [] };

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

    const order = io.connect(`${BASE_URL}/orders/${symbol}`, {
      // transports: ['websocket'],
    });
    const trade = io.connect(`${BASE_URL}/trades`, {
      // transports: ['websocket'],
    });
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
        order.emit('getOrders', { type: 'buy', offset: 0, count: 10 }, res => {
          console.log('get orders', res);
          dispatch({
            type: AT.BUY_ORDER_LIST_RECEIVED,
            data: getOrdersResponse.data,
          });
        });
        order.emit('getOrders', { type: 'sell', offset: 0, count: 10 }, res => {
          console.log('get orders', res);
          dispatch({
            type: AT.SELL_ORDER_LIST_RECEIVED,
            data: getOrdersResponse.data,
          });
        });
        order.on('order_event', data => {
          console.log(data);
        });
      });
      trade.on('connect', () => {
        trade.emit('getTrades', { offset: 0, count: 10 }, res => {
          console.log('get trades', res);
          dispatch({
            type: AT.TRADE_LIST_RECEIVED,
            data: getTradesResponse.data,
          });
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
          dispatch({
            type: AT.MY_BUY_ORDER_LIST_RECEIVED,
            data: getOrdersResponse.data,
          });
        });
        order.emit('getOrders', { type: 'sell', address: address, offset: 0, count: 10 }, res => {
          console.log('get orders', res);
          dispatch({
            type: AT.MY_SELL_ORDER_LIST_RECEIVED,
            data: getOrdersResponse.data,
          });
        });
      });
      trade.on('connect', () => {
        trade.emit('getTrades', { address: address, offset: 0, count: 10 }, res => {
          console.log('get trades by address', res);
          dispatch({
            type: AT.MY_TRADE_LIST_RECEIVED,
            data: getTradesResponse.data,
          });
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
