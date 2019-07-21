import AT from '../actionTypes';
import storage from '../../utils/storage';
import { toIcx } from '../../utils/formatter';

const initialState = {
  address: storage.get('address') || null,

  deposited: {
    icx: 0,
    token: 0,
  },
  undeposited: {
    icx: 0,
    token: 0,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AT.LOAD_ADDRESS_REQUEST:
      return {
        ...state,
      };
    case AT.LOAD_ADDRESS_SUCCESS:
      return {
        ...state,
        address: action.address,
      };
    case AT.LOAD_ICX_BALANCE_SUCCESS:
      return {
        ...state,
        undeposited: {
          ...state['undeposited'],
          icx: toIcx(action.balance),
        },
      };
    case AT.LOAD_TOKEN_BALANCE_SUCCESS:
      return {
        ...state,
        undeposited: {
          ...state['undeposited'],
          token: toIcx(action.balance),
        },
      };
    case AT.LOAD_DEPOSITED_ICX_BALANCE_SUCCESS:
      return {
        ...state,
        deposited: {
          ...state['deposited'],
          icx: toIcx(action.balance),
        },
      };
    case AT.LOAD_DEPOSITED_TOKEN_BALANCE_SUCCESS:
      return {
        ...state,
        deposited: {
          ...state['deposited'],
          token: toIcx(action.balance),
        },
      };
    default:
      return {
        ...state,
      };
  }
};
