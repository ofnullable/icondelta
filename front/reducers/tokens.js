export const initialState = {
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
  selectedToken: {
    id: 1,
    name: 'dai',
    address: '0x5ad76951b0f28356b6061cda991aa503dea062aa',
    symbol: 'DAI',
    currentPrice: 0.5,
  },
  isLoadingHistory: false,
};

export const CHANGE_TOKEN_REQUEST = 'TOKEN/CHANGE_TOKEN_REQUEST';
export const CHANGE_TOKEN_SUCCESS = 'TOKEN/CHANGE_TOKEN_SUCCESS';
export const CHANGE_TOKEN_FAILURE = 'TOKEN/CHANGE_TOKEN_FAILURE';

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_TOKEN_REQUEST:
      return {
        ...state,
        selectedToken: action.token,
        isLoadingHistory: true,
      };
    case CHANGE_TOKEN_SUCCESS:
      return {
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
};
