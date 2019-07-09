import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import BalanceContainer from '../containers/Balance';
import OrderBookContainer from '../containers/OrderBook';
import AT from '../redux/actionTypes';

import '../styles/index.scss';
import { addIconexEventListner, removeIconexEventListner, eventHandler } from '../utils/event';

const Home = () => {
  const address = useSelector(state => state.wallet.address);
  const currentToken = useSelector(state => state.token.currentToken);
  const dispatch = useDispatch();

  useEffect(() => {
    addIconexEventListner(eventHandler(dispatch));
    return () => removeIconexEventListner(eventHandler(dispatch));
  }, []);

  useEffect(() => {
    window.onload = async () => {
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
  }, [currentToken]);

  return (
    <>
      <BalanceContainer />
      <OrderBookContainer />
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
};

export default Home;
