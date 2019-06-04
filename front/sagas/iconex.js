import {
  all,
  takeLatest,
  takeEvery,
  fork,
  put,
  select,
} from 'redux-saga/effects';

import { generateJsonRpcId } from '../utils/jsonrpc';
import {
  getIcxBalanceEvent,
  getTokenBalanceEvent,
  getDepositedIcxBalanceEvent,
  getDepositedTokenBalanceEvent,
} from '../utils/events';
import {
  RESPONSE_ADDRESS,
  ICX_BALANCE_REQUEST,
  ICX_BALANCE_REQUEST_ID,
  ICX_BALANCE_SUCCESS,
  TOKEN_BALANCE_REQUEST,
  TOKEN_BALANCE_REQUEST_ID,
  TOKEN_BALANCE_SUCCESS,
  DEPOSITED_ICX_BALANCE_REQUEST,
  DEPOSITED_ICX_BALANCE_REQUEST_ID,
  DEPOSITED_ICX_BALANCE_SUCCESS,
  DEPOSITED_TOKEN_BALANCE_REQUEST,
  DEPOSITED_TOKEN_BALANCE_REQUEST_ID,
  DEPOSITED_TOKEN_BALANCE_SUCCESS,
  ICX_DEPOSIT_REQUEST_ID,
  ICX_DEPOSIT_SUCCESS,
  TOKEN_DEPOSIT_REQUEST_ID,
  TOKEN_DEPOSIT_SUCCESS,
  ICX_WITHDRAW_REQUEST_ID,
  ICX_WITHDRAW_SUCCESS,
  TOKEN_WITHDRAW_REQUEST_ID,
  TOKEN_WITHDRAW_SUCCESS,
  RESPONSE_JSON_RPC,
} from '../reducers/iconex';
import { CHANGE_TOKEN } from '../reducers/tokens';
import {
  LOAD_BUY_ORDER_REQUEST_ID,
  LOAD_SELL_ORDER_REQUEST_ID,
  LOAD_BUY_ORDER_SUCCESS,
  LOAD_SELL_ORDER_SUCCESS,
} from '../reducers/order';

export const token = state => state.tokens.selectedToken;
export const iconexState = state => state.iconex.jsonRpcIds;
export const orderState = state => state.order.jsonRpcIds;

function dispatchGetIcxBalance(address) {
  const networkIcxId = generateJsonRpcId();
  const networkIcxEvent = getIcxBalanceEvent(networkIcxId, address);

  const depositedIcxId = generateJsonRpcId();
  const depositedIcxEvent = getDepositedIcxBalanceEvent(
    depositedIcxId,
    address
  );

  window.dispatchEvent(networkIcxEvent);
  window.dispatchEvent(depositedIcxEvent);
  return [networkIcxId, depositedIcxId];
}

function dispatchGetTokenBalance(address, tokenAddress) {
  const networkTokenId = generateJsonRpcId();
  const networkTokenEvent = getTokenBalanceEvent(
    networkTokenId,
    address,
    tokenAddress
  );

  const depositedTokenId = generateJsonRpcId();
  const depositedTokenEvent = getDepositedTokenBalanceEvent(
    depositedTokenId,
    address,
    tokenAddress
  );

  window.dispatchEvent(networkTokenEvent);
  window.dispatchEvent(depositedTokenEvent);
  return [networkTokenId, depositedTokenId];
}

function* getBalance({ payload, tokenAddress }) {
  const icxId = yield dispatchGetIcxBalance(payload);
  yield put({
    type: ICX_BALANCE_REQUEST,
    id: icxId[0],
  });
  yield put({
    type: DEPOSITED_ICX_BALANCE_REQUEST,
    id: icxId[1],
  });
  const tokenId = dispatchGetTokenBalance(payload, tokenAddress);
  yield put({
    type: TOKEN_BALANCE_REQUEST,
    id: tokenId[0],
  });
  yield put({
    type: DEPOSITED_TOKEN_BALANCE_REQUEST,
    id: tokenId[1],
  });
}

function* watchResponseAddress() {
  yield takeEvery(RESPONSE_ADDRESS, getBalance);
}

function* getBalanceOnlyToken({ address, token }) {
  const tokenId = yield dispatchGetTokenBalance(address, token.address);
  yield put({
    type: TOKEN_BALANCE_REQUEST,
    id: tokenId[0],
  });
  yield put({
    type: DEPOSITED_TOKEN_BALANCE_REQUEST,
    id: tokenId[1],
  });
}

function* watchChangeToken() {
  yield takeLatest(CHANGE_TOKEN, getBalanceOnlyToken);
}

function* checkRpcId(action) {
  const iconexIds = yield select(iconexState);
  const orderIds = yield select(orderState);
  const { payload } = action;
  const { name, address } = yield select(token);

  // console.log('check saga', iconexIds, payload);
  switch (orderIds[payload.id]) {
    case LOAD_BUY_ORDER_REQUEST_ID:
      yield put({
        type: LOAD_BUY_ORDER_SUCCESS,
        id: payload.id,
        orders: payload.result,
        address,
      });
      return;
    case LOAD_SELL_ORDER_REQUEST_ID:
      yield put({
        type: LOAD_SELL_ORDER_SUCCESS,
        id: payload.id,
        orders: payload.result,
        address,
      });
      return;
    default:
      break;
  }
  switch (iconexIds[payload.id]) {
    case ICX_BALANCE_REQUEST_ID:
      yield put({
        type: ICX_BALANCE_SUCCESS,
        id: payload.id,
        balance: payload.result,
      });
      return;
    case DEPOSITED_ICX_BALANCE_REQUEST_ID:
      yield put({
        type: DEPOSITED_ICX_BALANCE_SUCCESS,
        id: payload.id,
        balance: payload.result,
      });
      return;
    case TOKEN_BALANCE_REQUEST_ID:
      yield put({
        type: TOKEN_BALANCE_SUCCESS,
        id: payload.id,
        balance: payload.result,
        name,
      });
      return;
    case DEPOSITED_TOKEN_BALANCE_REQUEST_ID:
      yield put({
        type: DEPOSITED_TOKEN_BALANCE_SUCCESS,
        id: payload.id,
        balance: payload.result,
        name,
      });
      return;
    case ICX_DEPOSIT_REQUEST_ID:
      yield put({
        type: ICX_DEPOSIT_SUCCESS,
        id: payload.id,
      });
      return;
    case TOKEN_DEPOSIT_REQUEST_ID:
      yield put({
        type: TOKEN_DEPOSIT_SUCCESS,
        id: payload.id,
        name,
      });
      return;
    case ICX_WITHDRAW_REQUEST_ID:
      yield put({
        type: ICX_WITHDRAW_SUCCESS,
        id: payload.id,
      });
      return;
    case TOKEN_WITHDRAW_REQUEST_ID:
      yield put({
        type: TOKEN_WITHDRAW_SUCCESS,
        id: payload.id,
        name,
      });
      return;
    default:
      break;
  }
}

function* watchJsonRpcResponse() {
  yield takeEvery(RESPONSE_JSON_RPC, checkRpcId);
}

export default function*() {
  yield all([
    fork(watchResponseAddress),
    fork(watchChangeToken),
    fork(watchJsonRpcResponse),
  ]);
}
