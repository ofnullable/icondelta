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
import { toIcx } from '../utils/formatter';

const BASE_URL = 'https://api.icondelta.ga'; // 'http://15.164.170.51'

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
      orderDate: 20190720,
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
      orderDate: 20190720,
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
      orderDate: 20190720,
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

    const order = io.connect(`${BASE_URL}/orders/${symbol}`, { transports: ['websocket'] });
    const trade = io.connect(`${BASE_URL}/trades/${symbol}`, { transports: ['websocket'] });

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
          // type: AT
          // })
        });
      });
      trade.on('connect', () => {
        console.log('trade socket connected');
        trade.emit('trade_event', { event: 'getTrades', params: { offset: 0, count: 10 } }, res => {
          console.log('get trades', res);
          dispatch({
            type: AT.TRADE_LIST_RECEIVED,
            data: res.data,
          });
        });
        trade.emit('trade_event', { event: 'getLatestTokenTrades', params: {} }, res => {
          console.log('get last token trades', res);
          // dispatch({
          //   type: AT.LAST_TRADE_RECEIVED,
          //   data: res.data,
          // });
        });
        trade.emit(
          'trade_event',
          {
            event: 'checkTradeTxHash',
            params: {
              txHash: '0xcbb307e96c291336beefbeab57e49d0a4a11c7a49ba88628b3a4f554bb114bcc',
            },
          },
          res => {
            console.log('check trade tx hash:', res);
          }
        );
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
  store.dispatch({
    type: AT.SET_CURRENT_TOKEN_SYMBOL,
    symbol,
  });

  return { symbol };
};

export default Home;
