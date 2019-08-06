import AT from '../actionTypes';

export const newOrderReceived = data => {
  return {
    type: AT.NEW_ORDER_RECEIVED,
    data,
  };
};
