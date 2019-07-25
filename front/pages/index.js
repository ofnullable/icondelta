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

const BASE_URL = 'ws://15.164.170.51';

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

    return () => {
      console.log('home component', sockets);
      if (sockets) {
        const { order } = sockets;
        order &&
          Object.keys(order.io.nsps).forEach(nsp => {
            if (order.io.nsps[nsp] === order) {
              delete order.io.nsps[nsp];
            }
          });
      }
    };
  }, [symbol]);

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
      <OrderBook symbol={symbol} socket={sockets} />
      <TokenBar symbol={symbol} socket={sockets && sockets.trade} />
      <Trade socket={sockets && sockets.order} />
      <History socket={sockets} />
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
