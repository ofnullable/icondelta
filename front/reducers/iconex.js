import produce from 'immer';

export const initialState = {
  address: '',
  icxBalance: 0,
  tokenBalance: 0,
  jsonRpcIds: {},
};

// json rpc requests
export const ICX_BALANCE_REQUEST_ID = 'ICX_REQUEST_ID';
export const TOKEN_BALANCE_REQUEST_ID = 'TOKEN_REQUEST_ID';

// actions
export const ICONEX_RELAY_RESPONSE = 'ICONEX_RELAY_RESPONSE';

export const RESPONSE_ADDRESS = 'RESPONSE_ADDRESS';

export const ICX_BALANCE_REQUEST = 'ICX_BALANCE_REQUEST';
export const ICX_BALANCE_SUCCESS = 'ICX_BALANCE_SUCCESS';

export const TOKEN_BALANCE_REQUEST = 'TOKEN_BALANCE_REQUEST';
export const TOKEN_BALANCE_SUCCESS = 'TOKEN_BALANCE_SUCCESS';

export const DEPOSIT_ICX_REQUEST = 'DEPOSIT_ICX_REQUEST';
export const DEPOSIT_ICX_SUCCESS = 'DEPOSIT_ICX_SUCCESS';

export const DEPOSIT_TOKEN_REQUEST = 'DEPOSIT_TOKEN_REQUEST';
export const DEPOSIT_TOKEN_SUCCESS = 'DEPOSIT_TOKEN_SUCCESS';

export const WITHDRAW_ICX_REQUEST = 'WITHDRAW_ICX_REQUEST';
export const WITHDRAW_ICX_SUCCESS = 'WITHDRAW_ICX_SUCCESS';

export const WITHDRAW_TOKEN_REQUEST = 'WITHDRAW_TOKEN_REQUEST';
export const WITHDRAW_TOKEN_SUCCESS = 'WITHDRAW_TOKEN_SUCCESS';

export const RESPONSE_JSON_RPC = 'RESPONSE_JSON-RPC';

export default (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case RESPONSE_ADDRESS:
        draft.address = action.payload;
        break;
      case ICX_BALANCE_REQUEST:
        draft.jsonRpcIds[action.id] = ICX_BALANCE_REQUEST_ID;
        break;
      case TOKEN_BALANCE_REQUEST:
        draft.jsonRpcIds[action.id] = TOKEN_BALANCE_REQUEST_ID;
        break;
      case RESPONSE_JSON_RPC:
        break;
      default:
        break;
    }
  });
};
