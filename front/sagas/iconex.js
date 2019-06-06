import { all, takeEvery, fork, put, select } from 'redux-saga/effects';

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

export const token = state => state.tokens.selectedToken;
export const iconexRequests = state => state.iconex.jsonRpcIds;
export const orderRequests = state => state.order.jsonRpcIds;

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

function* getBalance({ payload }) {
  const selectedToken = yield select(token);
  const icxId = yield dispatchGetIcxBalance(payload);
  yield put({
    type: ICX_BALANCE_REQUEST,
    id: icxId[0],
  });
  yield put({
    type: DEPOSITED_ICX_BALANCE_REQUEST,
    id: icxId[1],
  });
  const tokenId = yield dispatchGetTokenBalance(payload, selectedToken.address);
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
  yield takeEvery(CHANGE_TOKEN, getBalanceOnlyToken);
}

function* checkRpcId(action) {
  const iconexIds = yield select(iconexRequests);
  const orderIds = yield select(orderRequests);
  const { name } = yield select(token);
  const { payload } = action;

  const ids = { ...iconexIds, ...orderIds };
  console.log('check saga', payload);
  console.log('Response for:', ids[payload.id]);

  if (orderIds[payload.id]) return;
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
