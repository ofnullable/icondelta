export const initialState = {
  orderBook: null,
  myOrderBook: null,
  isLoading: false,
};

// myOrderBook example
// [
//   {
//     id: 2,
//     userAddress: 'user wallet address',
//     symbol: 'DAI',
//     address: 'token Address',
//     type: 'bid',
//     price: 0.49,
//     amount: 20,
//     total: 0.98,
//     orderedAt: new Date().toLocaleString(),
//   },
// ],

export const LOAD_ORDERBOOK_REQUEST = 'ORDER/LOAD_ORDERBOOK_REQUEST';
export const LOAD_ORDERBOOK_SUCCESS = 'ORDER/LOAD_ORDERBOOK_SUCCESS';
export const LOAD_ORDERBOOK_FAILURE = 'ORDER/LOAD_ORDERBOOK_FAILURE';

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return {
        ...state,
      };
  }
};
