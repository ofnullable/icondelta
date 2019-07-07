import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import HomeContainer from '../containers/Home';
import AT from '../redux/actionTypes';
import {
  addIconexEventListner,
  removeIconexEventListner,
} from '../utils/event';

import '../styles/index.scss';

const Home = () => {
  const address = useSelector(state => state.wallet.address);
  const dispatch = useDispatch();

  useEffect(() => {
    const handler = e => {
      const { type, payload } = e.detail;
      console.log(type, payload);
      dispatch({
        type,
        payload,
      });
    };

    addIconexEventListner(handler);

    return () => removeIconexEventListner();
  }, []);

  useEffect(() => {
    window.onload = () => {
      if (!address) {
        dispatch({
          type: AT.LOAD_ADDRESS_REQUEST,
        });
      } else {
        store.dispatch({
          type: AT.LOAD_BALANCE_REQUEST,
          address,
          token,
        });
      }
    };
  }, [address]);
  return <HomeContainer />;
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
