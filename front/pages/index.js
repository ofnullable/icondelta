import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Balance from '../components/Balance';
import OrderBook from '../components/OrderBook';
import TokenBar from '../components/TokenBar';
import Trade from '../components/Trade';
import History from '../components/History';

import AT from '../redux/actionTypes';
import { addIconexEventListner, removeIconexEventListner, eventHandler } from '../utils/event';

import '../styles/index.scss';

const Home = ({ symbol }) => {
  const address = useSelector(state => state.wallet.address);
  const { currentToken, tokens } = useSelector(state => state.token);
  const dispatch = useDispatch();

  useEffect(() => {
    addIconexEventListner(eventHandler(dispatch));
    return () => removeIconexEventListner();
  }, []);

  useEffect(() => {
    window.onload = () => {
      loadWalletData();
    };

    if (symbol !== currentToken.data.symbol) {
      dispatch({
        type: AT.CHANGE_CURRENT_TOKEN,
        data: tokens.data.find(t => t.symbol === symbol),
      });
      loadWalletData();
    }
  }, [currentToken]);

  const loadWalletData = address => {
    if (address) {
      dispatch({
        type: AT.LOAD_BALANCE_REQUEST,
        address,
      });
    } else {
      dispatch({
        type: AT.LOAD_ADDRESS_REQUEST,
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
  store.dispatch({
    type: AT.LOAD_ORDER_LIST_REQUEST,
    symbol,
  });
  return { symbol };
};

export default Home;
