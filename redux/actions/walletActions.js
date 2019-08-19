import AT from '../actionTypes/index';

export const loadWalletBalance = data => {
  return {
    type: AT.LOAD_WALLET_BALANCE_REQEUST,
    address: data.address,
    symbol: data.symbol,
  };
};
