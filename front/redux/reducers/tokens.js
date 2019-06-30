import produce from 'immer';
import actionTypes from '../actionTypes';

export const initialState = {
  selectedToken: {
    name: 'AC3',
    // address: 'cx9ab3078e72c8d9017194d17b34b1a47b661945ca',
    address: 'cx12f393e1ddc8b5555c86c24d6f396c4c6ca37024',
    symbol: 'AC3',
    currentPrice: 0,
  },
  tokenList: [
    {
      name: 'AC3',
      // address: 'cx9ab3078e72c8d9017194d17b34b1a47b661945ca',
      address: 'cx12f393e1ddc8b5555c86c24d6f396c4c6ca37024',
      symbol: 'AC3',
      currentPrice: 0,
    },
    {
      name: 'Velic Token',
      address: 'cx81fe20ac9a8ed7387b8d17be878c1d0ccb01aabf',
      symbol: 'VELT',
      currentPrice: 0,
    },
    {
      name: 'LogisticsX',
      address: 'cxf9148db4f8ec78823a50cb06c4fed83660af38d0',
      symbol: 'PNP',
      currentPrice: 0,
    },
    {
      name: 'Sport Token',
      address: 'cx2137642d0bf1926fbe23a3688d042a0f34bc2b9a',
      symbol: 'SPORT',
      currentPrice: 0,
    },
    {
      name: 'Somesing Exchange',
      address: 'cx3ec2814520c0096715159b8fc55fa1f385be038c',
      symbol: 'DCX',
      currentPrice: 0,
    },
    {
      name: 'IconGameAlliance',
      address: 'cx429731644462ebcfd22185df38727273f16f9b87',
      symbol: 'IGA',
      currentPrice: 0,
    },
    {
      name: 'weBloc',
      address: 'cxbc264e6279ec971f11ebe3939fc88d05b243eba7',
      symbol: 'WOK',
      currentPrice: 0,
    },
    {
      name: 'VELICX',
      address: 'cxefaa21e34a3a1abf97369b5beef84524f52d88a8',
      symbol: 'VCX',
      currentPrice: 0,
    },
    {
      name: 'Velic Authority',
      address: 'cx19a23e850bf736387cd90d0b6e88ce9af76a8d41',
      symbol: 'VELA',
      currentPrice: 0,
    },
    {
      name: 'MECA Coin',
      address: 'cx921205acb7c51e16d5b7cbc37539a4357d929d20',
      symbol: 'MCA',
      currentPrice: 0,
    },
  ],
};

export default (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case actionTypes.CHANGE_TOKEN:
        draft.selectedToken = action.token;
        break;
      default:
        return {
          ...state,
        };
    }
  });
};
