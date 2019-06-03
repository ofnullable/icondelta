import produce from 'immer';

export const initialState = {
  selectedToken: {
    name: 'AC3',
    address: 'cx12f393e1ddc8b5555c86c24d6f396c4c6ca37024',
    symbol: 'AC3',
    currentPrice: 0.5,
  },
  tokenList: [
    {
      name: 'AC3',
      address: 'cx9ab3078e72c8d9017194d17b34b1a47b661945ca',
      symbol: 'AC3',
      currentPrice: 0.5,
    },
    {
      name: 'ACT',
      address: 'cx502c47463314f01e84b1b203c315180501eb2481',
      symbol: 'ACT',
      currentPrice: 0.27,
    },
    {
      name: 'Andrew Token',
      address: 'cxa3512fb64b8808ca07a8469e391b33d7243153b5',
      symbol: 'ATK',
      currentPrice: 0.81,
    },
    {
      name: 'BLOC8',
      address: 'cxbdda1241313c0113f8ebf4b974239b145558513a',
      symbol: 'BLOC8',
      currentPrice: 0,
    },
    {
      name: 'DiceCoinX',
      address: 'cx17eb6014740f2ae1d547df76fa593f988986661b',
      symbol: 'DCX',
      currentPrice: 0,
    },
    {
      name: 'ELGUAPO COIN',
      address: 'cxba7a8271d85ed673d27574a30e3261e147902e92',
      symbol: 'GUP',
      currentPrice: 0,
    },
    {
      name: 'IconGameAlliance',
      address: 'cx81fe20ac9a8ed7387b8d17be878c1d0ccb01aabf',
      symbol: 'IGA',
      currentPrice: 0,
    },
    {
      name: 'LogisticsX',
      address: 'cx2137642d0bf1926fbe23a3688d042a0f34bc2b9a',
      symbol: 'PNP',
      currentPrice: 0,
    },
    {
      name: 'MECA Coin',
      address: 'cxf9148db4f8ec78823a50cb06c4fed83660af38d0',
      symbol: 'MCA',
      currentPrice: 0,
    },
    {
      name: 'PATRICK',
      address: 'cx8c43c6980d57aee6a0c69fb3a2f3c30fb0801b6d',
      symbol: 'PAT',
      currentPrice: 0,
    },
  ],
};

export const CHANGE_TOKEN = 'TOKEN/CHANGE_TOKEN';

export const LOAD_TOKEN_HISTORY_REQUEST = 'TOKEN/LOAD_TOKEN_HISTORY_REQUEST';
export const LOAD_TOKEN_HISTORY_SUCCESS = 'TOKEN/LOAD_TOKEN_HISTORY_SUCCESS';
export const LOAD_TOKEN_HISTORY_FAILURE = 'TOKEN/LOAD_TOKEN_HISTORY_FAILURE';

export default (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case CHANGE_TOKEN:
        draft.selectedToken = action.token;
        break;
      default:
        return {
          ...state,
        };
    }
  });
};
