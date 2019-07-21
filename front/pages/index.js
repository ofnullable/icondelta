import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import socket from 'socket.io-client';

import Balance from '../components/Balance';
import OrderBook from '../components/OrderBook';
import TokenBar from '../components/TokenBar';
import Trade from '../components/Trade';
import History from '../components/History';

import AT from '../redux/actionTypes';
import { addIconexEventListner, removeIconexEventListner, eventHandler } from '../utils/event';

import '../styles/index.scss';

const Home = ({ symbol }) => {
  const { address } = useSelector(state => state.wallet);
  const dispatch = useDispatch();

  useEffect(() => {
    const handler = eventHandler(dispatch);
    addIconexEventListner(handler);
    return () => removeIconexEventListner(handler);
  }, []);

  useEffect(() => {
    loadWalletData(address);

    const orderSocekt = socket(`http://localhost:8010/orders?symbol=${symbol}`);
    orderSocekt.on('connect', () => {
      console.log('socket conneted!');
    });

    return () => orderSocekt.disconnect();
  }, [symbol]);

  const loadWalletData = address => {
    if (address) {
      dispatch({
        type: AT.LOAD_BALANCE_REQUEST,
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
      <OrderBook symbol={symbol} />
      <TokenBar symbol={symbol} />
      <Trade />
      <History />
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
