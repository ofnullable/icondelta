import produce from 'immer';
import { toIcx } from '../utils/formatter';

export const initialState = {
  address: '',
  depositedIcx: 0,
  depositedToken: {
    AC3: 0,
  },
  undepositedIcx: 0,
  undepositedToken: {
    AC3: 0,
  },
  jsonRpcIds: {},
  icxDepositAmount: 0,
  icxWithdrawAmount: 0,
  tokenDepositAmount: 0,
  tokenWithdrawAmount: 0,
};

// json rpc requests
export const DEPOSITED_ICX_BALANCE_REQUEST_ID =
  'DEPOSITED_ICX_BALANCE_REQUEST_ID';
export const DEPOSITED_TOKEN_BALANCE_REQUEST_ID =
  'DEPOSITED_TOKEN_BALANCE_REQUEST_ID';
export const ICX_BALANCE_REQUEST_ID = 'ICX_BALANCE_REQUEST_ID';
export const TOKEN_BALANCE_REQUEST_ID = 'TOKEN_BALANCE_REQUEST_ID';
export const ICX_DEPOSIT_REQUEST_ID = 'ICX_DEPOSIT_REQUEST_ID';
export const TOKEN_DEPOSIT_REQUEST_ID = 'TOKEN_DEPOSIT_REQUEST_ID';
export const ICX_WITHDRAW_REQUEST_ID = 'ICX_WITHDRAW_REQUEST_ID';
export const TOKEN_WITHDRAW_REQUEST_ID = 'TOKEN_WITHDRAW_REQUEST_ID';

// json rpc respons
export const RESPONSE_ADDRESS = 'RESPONSE_ADDRESS';
export const RESPONSE_JSON_RPC = 'RESPONSE_JSON-RPC';

// actions
export const ICONEX_RELAY_RESPONSE = 'ICONEX_RELAY_RESPONSE';

export const DEPOSITED_ICX_BALANCE_REQUEST = 'DEPOSITED_ICX_BALANCE_REQUEST';
export const DEPOSITED_ICX_BALANCE_SUCCESS = 'DEPOSITED_ICX_BALANCE_SUCCESS';

export const DEPOSITED_TOKEN_BALANCE_REQUEST =
  'DEPOSITED_TOKEN_BALANCE_REQUEST';
export const DEPOSITED_TOKEN_BALANCE_SUCCESS =
  'DEPOSITED_TOKEN_BALANCE_SUCCESS';

export const ICX_BALANCE_REQUEST = 'ICX_BALANCE_REQUEST';
export const ICX_BALANCE_SUCCESS = 'ICX_BALANCE_SUCCESS';

export const TOKEN_BALANCE_REQUEST = 'TOKEN_BALANCE_REQUEST';
export const TOKEN_BALANCE_SUCCESS = 'TOKEN_BALANCE_SUCCESS';

export const ICX_DEPOSIT_REQUEST = 'ICX_DEPOSIT_REQUEST';
export const ICX_DEPOSIT_SUCCESS = 'ICX_DEPOSIT_SUCCESS';

export const TOKEN_DEPOSIT_REQUEST = 'TOKEN_DEPOSIT_REQUEST';
export const TOKEN_DEPOSIT_SUCCESS = 'TOKEN_DEPOSIT_SUCCESS';

export const ICX_WITHDRAW_REQUEST = 'ICX_WITHDRAW_REQUEST';
export const ICX_WITHDRAW_SUCCESS = 'ICX_WITHDRAW_SUCCESS';

export const TOKEN_WITHDRAW_REQUEST = 'TOKEN_WITHDRAW_REQUEST';
export const TOKEN_WITHDRAW_SUCCESS = 'TOKEN_WITHDRAW_SUCCESS';

export const findId = ({ jsonRpcIds }, target) =>
  Object.keys(jsonRpcIds).find(id => jsonRpcIds[id] === target);

export default (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case RESPONSE_ADDRESS: {
        draft.address = action.payload;
        break;
      }
      case ICX_BALANCE_REQUEST: {
        // for prevent duplicate
        const id = findId(draft, ICX_BALANCE_REQUEST_ID);
        delete draft.jsonRpcIds[id];
        draft.jsonRpcIds[action.id] = ICX_BALANCE_REQUEST_ID;
        break;
      }
      case ICX_BALANCE_SUCCESS: {
        draft.jsonRpcIds[action.id] && delete draft.jsonRpcIds[action.id];
        draft.undepositedIcx = toIcx(action.balance);
        break;
      }
      case DEPOSITED_ICX_BALANCE_REQUEST: {
        const id = findId(draft, DEPOSITED_ICX_BALANCE_REQUEST);
        delete draft.jsonRpcIds[id];
        draft.jsonRpcIds[action.id] = DEPOSITED_ICX_BALANCE_REQUEST_ID;
        break;
      }
      case DEPOSITED_ICX_BALANCE_SUCCESS: {
        draft.jsonRpcIds[action.id] && delete draft.jsonRpcIds[action.id];
        draft.depositedIcx = toIcx(action.balance);
        break;
      }
      case TOKEN_BALANCE_REQUEST: {
        const id = findId(draft, TOKEN_BALANCE_REQUEST_ID);
        delete draft.jsonRpcIds[id];
        draft.jsonRpcIds[action.id] = TOKEN_BALANCE_REQUEST_ID;
        break;
      }
      case TOKEN_BALANCE_SUCCESS: {
        draft.jsonRpcIds[action.id] && delete draft.jsonRpcIds[action.id];
        draft.undepositedToken[action.name] = toIcx(action.balance);
        break;
      }
      case DEPOSITED_TOKEN_BALANCE_REQUEST: {
        const id = findId(draft, DEPOSITED_TOKEN_BALANCE_REQUEST_ID);
        delete draft.jsonRpcIds[id];
        draft.jsonRpcIds[action.id] = DEPOSITED_TOKEN_BALANCE_REQUEST_ID;
        break;
      }
      case DEPOSITED_TOKEN_BALANCE_SUCCESS: {
        draft.jsonRpcIds[action.id] && delete draft.jsonRpcIds[action.id];
        draft.depositedToken[action.name] = toIcx(action.balance);
        break;
      }
      case ICX_DEPOSIT_REQUEST: {
        const id = findId(draft, ICX_DEPOSIT_REQUEST_ID);
        delete draft.jsonRpcIds[id];
        draft.icxDepositAmount = action.icxAmount;
        draft.jsonRpcIds[action.id] = ICX_DEPOSIT_REQUEST_ID;
        break;
      }
      case TOKEN_DEPOSIT_REQUEST: {
        const id = findId(draft, TOKEN_DEPOSIT_REQUEST_ID);
        delete draft.jsonRpcIds[id];
        draft.tokenDepositAmount = action.tokenAmount;
        draft.jsonRpcIds[action.id] = TOKEN_DEPOSIT_REQUEST_ID;
        break;
      }
      case ICX_DEPOSIT_SUCCESS: {
        draft.jsonRpcIds[action.id] && delete draft.jsonRpcIds[action.id];
        console.log('deposit success', toIcx(draft.icxDepositAmount));
        draft.depositedIcx += toIcx(draft.icxDepositAmount);
        draft.undepositedIcx -= toIcx(draft.icxDepositAmount);
        draft.icxDepositAmount = 0;
        break;
      }
      case TOKEN_DEPOSIT_SUCCESS: {
        draft.jsonRpcIds[action.id] && delete draft.jsonRpcIds[action.id];
        draft.depositedToken[action.name] += toIcx(draft.tokenDepositAmount);
        draft.undepositedToken[action.name] -= toIcx(draft.tokenDepositAmount);
        draft.tokenDepositAmount = 0;
        break;
      }
      case ICX_WITHDRAW_REQUEST: {
        const id = findId(draft, ICX_WITHDRAW_REQUEST_ID);
        delete draft.jsonRpcIds[id];
        draft.icxWithdrawAmount = action.icxAmount;
        draft.jsonRpcIds[action.id] = ICX_WITHDRAW_REQUEST_ID;
        break;
      }
      case TOKEN_WITHDRAW_REQUEST: {
        const id = findId(draft, TOKEN_WITHDRAW_REQUEST_ID);
        delete draft.jsonRpcIds[id];
        draft.tokenWithdrawAmount = action.tokenAmount;
        draft.jsonRpcIds[action.id] = TOKEN_WITHDRAW_REQUEST_ID;
        break;
      }
      case ICX_WITHDRAW_SUCCESS: {
        delete draft.jsonRpcIds[action.id];
        draft.depositedIcx -= toIcx(draft.icxWithdrawAmount);
        draft.undepositedIcx += toIcx(draft.icxWithdrawAmount);
        draft.icxWithdrawAmount = 0;
        break;
      }
      case TOKEN_WITHDRAW_SUCCESS: {
        delete draft.jsonRpcIds[action.id];
        draft.depositedToken[action.name] -= toIcx(draft.tokenWithdrawAmount);
        draft.undepositedToken[action.name] += toIcx(draft.tokenWithdrawAmount);
        draft.tokenWithdrawAmount = 0;
        break;
      }
      default:
        break;
    }
  });
};
