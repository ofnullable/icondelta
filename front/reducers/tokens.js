export const initialState = {
  selectedToken: {
    id: 1,
    name: 'dai',
    address: '0x5ad76951b0f28356b6061cda991aa503dea062aa',
    symbol: 'DAI',
    currentPrice: 0.5,
  },
  tokenList: [
    {
      id: 1,
      name: 'dai',
      address: '0x5ad76951b0f28356b6061cda991aa503dea062aa',
      symbol: 'DAI',
      currentPrice: 0.5,
    },
    {
      id: 2,
      name: 'eos',
      address: '0x5ad76951b0f28356b6061cda991aa503dea062ab',
      symbol: 'EOS',
      currentPrice: 0.27,
    },
    {
      id: 3,
      name: 'airbloc',
      address: '0x5ad76951b0f28356b6061cda991aa503dea062ac',
      symbol: 'AIR',
      currentPrice: 0.81,
    },
  ],
  histories: {
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
  },
  isLoadingHistory: false,
};

export const CHANGE_TOKEN = 'TOKEN/CHANGE_TOKEN';

export const LOAD_TOKEN_HISTORY_REQUEST = 'TOKEN/LOAD_TOKEN_HISTORY_REQUEST';
export const LOAD_TOKEN_HISTORY_SUCCESS = 'TOKEN/LOAD_TOKEN_HISTORY_SUCCESS';
export const LOAD_TOKEN_HISTORY_FAILURE = 'TOKEN/LOAD_TOKEN_HISTORY_FAILURE';

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_TOKEN:
      return {
        ...state,
        selectedToken: action.token,
        isLoadingHistory: true,
      };
    default:
      return {
        ...state,
      };
  }
};
