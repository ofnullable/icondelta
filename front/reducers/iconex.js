export const initialState = {
  address: '',
  icxBalance: 0,
  tokenBalance: 0,
  icxRequestId: 0,
  tokenRequestId: 0,
};

export const ICONEX_RELAY_RESPONSE = 'ICONEX_RELAY_RESPONSE';

export const RESPONSE_ADDRESS = 'RESPONSE_ADDRESS';

export const ICX_BALANCE_REQUEST = 'ICX_BALANCE_REQUEST';
export const ICX_BALANCE_SUCCESS = 'ICX_BALANCE_SUCCESS';

export const TOKEN_BALANCE_REQUEST = 'TOKEN_BALANCE_REQUEST';
export const TOKEN_BALANCE_SUCCESS = 'TOKEN_BALANCE_SUCCESS';

export const RESPONSE_JSON_RPC = 'RESPONSE_JSON-RPC';

export default (state = initialState, action) => {
  switch (action.type) {
    case RESPONSE_ADDRESS:
      return {
        ...state,
        address: action.payload,
      };
    case ICX_BALANCE_REQUEST:
      return {
        ...state,
        icxRequestId: action.id,
      };
    case TOKEN_BALANCE_REQUEST:
      return {
        ...state,
        tokenRequestId: action.id,
      };
    case RESPONSE_JSON_RPC:
      return {
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
};
