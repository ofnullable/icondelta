import AT from '../actionTypes';

export const newOrderReceived = data => {
  return {
    type: AT.NEW_ORDER_RECEIVED,
    data,
  };
};

export const removeTemporalOrder = () => {
  return {
    type: AT.REMOVE_TEMPORAL_ORDER,
  };
};
