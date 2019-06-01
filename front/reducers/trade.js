export const initialState = {
  tradeHistory: [
    {
      id: null, // 추후 database 연동 시 필요
      from: 'send user wallet address',
      to: 'receive user wallet address',
      address: 'toekn address',
      symbol: 'DAI',
      type: 'bid', // sell token
      price: 0.5,
      amount: 2,
      total: 1,
      tradedAt: new Date().toLocaleString(),
    },
  ],
  isLoading: false,
};

export const LOAD_TRADE_HISTORY_REQUEST = 'TRADE/LOAD_TRADE_HISTORY_REQUEST';
export const LOAD_TRADE_HISTORY_SUCCESS = 'TRADE/LOAD_TRADE_HISTORY_SUCCESS';
export const LOAD_TRADE_HISTORY_FAILURE = 'TRADE/LOAD_TRADE_HISTORY_FAILURE';

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return {
        ...state,
      };
  }
};
