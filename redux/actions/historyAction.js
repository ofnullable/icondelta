import AT from '../actionTypes/index';

export const myNewTradeReceived = data => {
  return {
    type: AT.MY_NEW_TRADE_RECEIVED,
    data,
  };
};

export const myNewOrderReceived = data => {
  return {
    type: AT.MY_NEW_ORDER_RECEIVED,
    data,
  };
};
