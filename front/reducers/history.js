export const initialState = {
  orderHistory: [
    {
      id: 1,
      useAddress: 'user wallet address',
      symbol: 'DAI',
      address: 'token Address',
      type: 'ask',
      price: 0.5,
      amount: 2,
      total: 1,
      createdAt: new Date().toLocaleString(),
    },
    {
      id: 2,
      userAddress: 'user wallet address',
      symbol: 'DAI',
      address: 'token Address',
      type: 'bid',
      price: 0.49,
      amount: 20,
      total: 0.98,
      createdAt: new Date().toLocaleString(),
    },
  ],
  tradeHistory: [
    {
      id: 1,
      userAddress: 'user wallet address',
      symbol: 'DAI',
      type: 'bid',
      price: 0.5,
      amount: 2,
      total: 1,
      createdAt: new Date().toLocaleString(),
    },
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return {
        ...state,
      };
  }
};
