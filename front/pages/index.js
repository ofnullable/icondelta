import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import BalanceContainer from '../containers/Balance';
import OrderBookContainer from '../containers/OrderBook';
import AT from '../redux/actionTypes';
import storage from '../utils/storage';
import { addIconexEventListner, removeIconexEventListner, eventHandler } from '../utils/event';

import '../styles/index.scss';

const Home = () => {
  const address = useSelector(state => state.wallet.address || storage.get('address'));
  const token = useSelector(state => state.token.currentToken.data);
  const dispatch = useDispatch();

  useEffect(() => {
    addIconexEventListner(eventHandler(dispatch));
    return () => removeIconexEventListner();
  }, []);

  useEffect(() => {
    window.onload = () => {
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
  }, [token]);

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
