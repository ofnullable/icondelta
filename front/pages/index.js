import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import HomeContainer from '../containers/Home';
import AT from '../redux/actionTypes';
import {
  addIconexEventListner,
  removeIconexEventListner,
  requestAddress,
} from '../utils/event';

import '../styles/index.scss';
import { isServer } from '../utils/const';

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
      }
    };
  }, [address]);
  return <HomeContainer />;
};

Home.getInitialProps = async context => {
  const store = context.store;

  store.dispatch({
    type: AT.LOAD_TOKEN_LIST_REQUEST,
  });

  const token = context.query.symbol;
  const address = context.store.getState().wallet.address;

  if (address) {
    store.dispatch({
      type: AT.LOAD_BALANCE_REQUEST,
      address,
      token,
    });
  }
};

export default Home;
