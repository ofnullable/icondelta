import produce from 'immer';
import { toIcx } from '../../utils/formatter';
import AT from '../actionTypes';

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

export const findId = ({ jsonRpcIds }, target) =>
  Object.keys(jsonRpcIds).find(id => jsonRpcIds[id] === target);

export default (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case AT.RESPONSE_ADDRESS: {
        draft.address = action.payload;
        break;
      }
      case AT.ICX_BALANCE_REQUEST: {
        // for prevent duplicate
        const id = findId(draft, AT.ICX_BALANCE_REQUEST_ID);
        delete draft.jsonRpcIds[id];
        draft.jsonRpcIds[action.id] = AT.ICX_BALANCE_REQUEST_ID;
        break;
      }
      case AT.ICX_BALANCE_SUCCESS: {
        delete draft.jsonRpcIds[action.id];
        draft.undepositedIcx = toIcx(action.balance) || 0;
        break;
      }
      case AT.DEPOSITED_ICX_BALANCE_REQUEST: {
        const id = findId(draft, AT.DEPOSITED_ICX_BALANCE_REQUEST);
        delete draft.jsonRpcIds[id];
        draft.jsonRpcIds[action.id] = AT.DEPOSITED_ICX_BALANCE_REQUEST_ID;
        break;
      }
      case AT.DEPOSITED_ICX_BALANCE_SUCCESS: {
        delete draft.jsonRpcIds[action.id];
        draft.depositedIcx = toIcx(action.balance) || 0;
        break;
      }
      case AT.TOKEN_BALANCE_REQUEST: {
        const id = findId(draft, AT.TOKEN_BALANCE_REQUEST_ID);
        delete draft.jsonRpcIds[id];
        draft.jsonRpcIds[action.id] = AT.TOKEN_BALANCE_REQUEST_ID;
        break;
      }
      case AT.TOKEN_BALANCE_SUCCESS: {
        delete draft.jsonRpcIds[action.id];
        draft.undepositedToken[action.name] = toIcx(action.balance) || 0;
        break;
      }
      case AT.DEPOSITED_TOKEN_BALANCE_REQUEST: {
        const id = findId(draft, AT.DEPOSITED_TOKEN_BALANCE_REQUEST_ID);
        delete draft.jsonRpcIds[id];
        draft.jsonRpcIds[action.id] = AT.DEPOSITED_TOKEN_BALANCE_REQUEST_ID;
        break;
      }
      case AT.DEPOSITED_TOKEN_BALANCE_SUCCESS: {
        delete draft.jsonRpcIds[action.id];
        draft.depositedToken[action.name] = toIcx(action.balance) || 0;
        break;
      }
      case AT.ICX_DEPOSIT_REQUEST: {
        const id = findId(draft, AT.ICX_DEPOSIT_REQUEST_ID);
        delete draft.jsonRpcIds[id];
        draft.icxDepositAmount = action.icxAmount;
        draft.jsonRpcIds[action.id] = AT.ICX_DEPOSIT_REQUEST_ID;
        break;
      }
      case AT.ICX_DEPOSIT_SUCCESS: {
        delete draft.jsonRpcIds[action.id];
        draft.depositedIcx += toIcx(draft.icxDepositAmount);
        draft.undepositedIcx -= toIcx(draft.icxDepositAmount);
        draft.icxDepositAmount = 0;
        break;
      }
      case AT.TOKEN_DEPOSIT_REQUEST: {
        const id = findId(draft, AT.TOKEN_DEPOSIT_REQUEST_ID);
        delete draft.jsonRpcIds[id];
        draft.tokenDepositAmount = action.tokenAmount;
        draft.jsonRpcIds[action.id] = AT.TOKEN_DEPOSIT_REQUEST_ID;
        break;
      }
      case AT.OKEN_DEPOSIT_SUCCESS: {
        delete draft.jsonRpcIds[action.id];
        draft.depositedToken[action.name] += toIcx(draft.tokenDepositAmount);
        draft.undepositedToken[action.name] -= toIcx(draft.tokenDepositAmount);
        draft.tokenDepositAmount = 0;
        break;
      }
      case AT.ICX_WITHDRAW_REQUEST: {
        const id = findId(draft, AT.ICX_WITHDRAW_REQUEST_ID);
        delete draft.jsonRpcIds[id];
        draft.icxWithdrawAmount = action.icxAmount;
        draft.jsonRpcIds[action.id] = AT.ICX_WITHDRAW_REQUEST_ID;
        break;
      }
      case AT.ICX_WITHDRAW_SUCCESS: {
        delete draft.jsonRpcIds[action.id];
        draft.depositedIcx -= toIcx(draft.icxWithdrawAmount);
        draft.undepositedIcx += toIcx(draft.icxWithdrawAmount);
        draft.icxWithdrawAmount = 0;
        break;
      }
      case AT.TOKEN_WITHDRAW_REQUEST: {
        const id = findId(draft, AT.TOKEN_WITHDRAW_REQUEST_ID);
        delete draft.jsonRpcIds[id];
        draft.tokenWithdrawAmount = action.tokenAmount;
        draft.jsonRpcIds[action.id] = AT.TOKEN_WITHDRAW_REQUEST_ID;
        break;
      }
      case AT.TOKEN_WITHDRAW_SUCCESS: {
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
