import AT from '../actionTypes';
import storage from '../../utils/storage';
import { INITIAL_STATE } from '../../utils/const';
import { toIcx } from '../../utils/formatter';

const initialState = {
  address: storage.get('address') || null,

  icx: INITIAL_STATE['OBJ'],
  token: INITIAL_STATE['OBJ'],
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
    case AT.LOAD_WALLET_BALANCE_REQEUST:
      return {
        ...state,
        icx: {
          ...state.icx,
          isProceeding: true,
        },
        token: {
          ...state.token,
          isProceeding: true,
        },
      };
    case AT.LOAD_WALLET_BALANCE_SUCCESS:
      Object.keys(action.icx).forEach(k => (action.icx[k] = toIcx(action.icx[k])));
      Object.keys(action.token).forEach(k => (action.token[k] = toIcx(action.token[k])));
      return {
        ...state,
        icx: {
          error: '',
          data: action.icx,
          isProceeding: false,
        },
        token: {
          error: '',
          data: action.token,
          isProceeding: false,
        },
      };

    case AT.LOAD_ICX_BALANCE_FAILURE:
      Object.keys(action.token).forEach(k => (action.token[k] = toIcx(action.token[k])));
      return {
        ...state,
        icx: {
          ...state.icx,
          isProceeding: false,
          error: action.error,
        },
        token: {
          ...state.token,
          data: action.token,
          isProceeding: false,
        },
      };

    case AT.LOAD_TOKEN_BALANCE_FAILURE:
      Object.keys(action.icx).forEach(k => (action.icx[k] = toIcx(action.icx[k])));
      return {
        ...state,
        icx: {
          ...state.icx,
          data: action.icx,
          isProceeding: false,
        },
        token: {
          ...state.token,
          isProceeding: false,
          error: action.error,
        },
      };

    case AT.LOAD_WALLET_BALANCE_FAILURE:
      return {
        ...state,
        icx: {
          ...state.icx,
          isProceeding: false,
          error: action.error,
        },
        token: {
          ...state.token,
          isProceeding: false,
          error: action.error,
        },
      };

    default:
      return {
        ...state,
      };
  }
};
