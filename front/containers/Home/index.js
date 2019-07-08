import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Home from '../../components/Home';
import AT from '../../redux/actionTypes';
import { addIconexEventListner, eventHandler, removeIconexEventListner } from '../../utils/event';

const HomeContainer = () => {
  const address = useSelector(state => state.wallet.address);
  const currentToken = useSelector(state => state.token.currentToken);
  const dispatch = useDispatch();

  useEffect(() => {
    addIconexEventListner(eventHandler);
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
  }, [currentToken]);

  return (
    <>
      <Home />
    </>
  );
};

export default HomeContainer;
