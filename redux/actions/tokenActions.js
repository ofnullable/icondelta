import AT from '../actionTypes/index';

export const setTokenPrice = data => {
  return {
    type: AT.SET_TOKEN_PRICE,
    data,
  };
};
