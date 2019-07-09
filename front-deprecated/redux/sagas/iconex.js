import { fork, put, all, takeEvery, select } from 'redux-saga/effects';

import { generateJsonRpcId } from '../../utils/jsonrpc';
import {
  getIcxBalanceEvent,
  getTokenBalanceEvent,
  getDepositedIcxBalanceEvent,
  getDepositedTokenBalanceEvent,
} from '../../utils/events';
import AT from '../actionTypes';

export const token = state => state.tokens.selectedToken;
export const iconexRequests = state => state.iconex.jsonRpcIds;
export const orderRequests = state => state.order.jsonRpcIds;

function dispatchGetIcxBalance(address) {
  const networkIcxId = generateJsonRpcId();
  const networkIcxEvent = getIcxBalanceEvent(networkIcxId, address);

  const depositedIcxId = generateJsonRpcId();
  const depositedIcxEvent = getDepositedIcxBalanceEvent(depositedIcxId, address);

  window.dispatchEvent(networkIcxEvent);
  window.dispatchEvent(depositedIcxEvent);
  return [networkIcxId, depositedIcxId];
}

function dispatchGetTokenBalance(address, tokenAddress) {
  const networkTokenId = generateJsonRpcId();
  const networkTokenEvent = getTokenBalanceEvent(networkTokenId, address, tokenAddress);

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
    type: AT.ICX_BALANCE_REQUEST,
    id: icxId[0],
  });
  yield put({
    type: AT.DEPOSITED_ICX_BALANCE_REQUEST,
    id: icxId[1],
  });
  const tokenId = yield dispatchGetTokenBalance(payload, selectedToken.address);
  yield put({
    type: AT.TOKEN_BALANCE_REQUEST,
    id: tokenId[0],
  });
  yield put({
    type: AT.DEPOSITED_TOKEN_BALANCE_REQUEST,
    id: tokenId[1],
  });
}

function* watchResponseAddress() {
  yield takeEvery(AT.RESPONSE_ADDRESS, getBalance);
}

function* getBalanceOnlyToken({ address, token }) {
  const tokenId = yield dispatchGetTokenBalance(address, token.address);
  yield put({
    type: AT.TOKEN_BALANCE_REQUEST,
    id: tokenId[0],
  });
  yield put({
    type: AT.DEPOSITED_TOKEN_BALANCE_REQUEST,
    id: tokenId[1],
  });
}

function* watchChangeToken() {
  yield takeEvery(AT.CHANGE_TOKEN, getBalanceOnlyToken);
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
    case AT.ICX_BALANCE_REQUEST_ID:
      yield put({
        type: AT.ICX_BALANCE_SUCCESS,
        id: payload.id,
        balance: payload.result,
      });
      return;
    case AT.DEPOSITED_ICX_BALANCE_REQUEST_ID:
      yield put({
        type: AT.DEPOSITED_ICX_BALANCE_SUCCESS,
        id: payload.id,
        balance: payload.result,
      });
      return;
    case AT.TOKEN_BALANCE_REQUEST_ID:
      yield put({
        type: AT.TOKEN_BALANCE_SUCCESS,
        id: payload.id,
        balance: payload.result,
        name,
      });
      return;
    case AT.DEPOSITED_TOKEN_BALANCE_REQUEST_ID:
      yield put({
        type: AT.DEPOSITED_TOKEN_BALANCE_SUCCESS,
        id: payload.id,
        balance: payload.result,
        name,
      });
      return;
    case AT.ICX_DEPOSIT_REQUEST_ID:
      yield put({
        type: AT.ICX_DEPOSIT_SUCCESS,
        id: payload.id,
      });
      return;
    case AT.TOKEN_DEPOSIT_REQUEST_ID:
      yield put({
        type: AT.TOKEN_DEPOSIT_SUCCESS,
        id: payload.id,
        name,
      });
      return;
    case AT.ICX_WITHDRAW_REQUEST_ID:
      yield put({
        type: AT.ICX_WITHDRAW_SUCCESS,
        id: payload.id,
      });
      return;
    case AT.TOKEN_WITHDRAW_REQUEST_ID:
      yield put({
        type: AT.TOKEN_WITHDRAW_SUCCESS,
        id: payload.id,
        name,
      });
      return;
  }
}

function* watchJsonRpcResponse() {
  yield takeEvery(AT.RESPONSE_JSON_RPC, checkRpcId);
}

export default function*() {
  yield all([fork(watchResponseAddress), fork(watchChangeToken), fork(watchJsonRpcResponse)]);
}
