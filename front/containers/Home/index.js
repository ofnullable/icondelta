import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import BalanceContainer from '../Balance';
import AT from '../../redux/actionTypes';
import {
  addIconexEventListner,
  removeIconexEventListner,
  requestAddress,
} from '../../utils/event';

const HomeContainer = () => {
  const address = useSelector(state => state.wallet.address);
  const dispatch = useDispatch();

  useEffect(() => {
    addIconexEventListner();
    return () => removeIconexEventListner();
  }, []);

  // TODO: token 변경 시 action dispatch
  useEffect(() => {
    window.onload = () => {
      if (!address) {
        dispatch({
          type: AT.LOAD_ADDRESS_REQUEST,
        });
      }
    };
  }, []);

  return <BalanceContainer />;
};

export default HomeContainer;
