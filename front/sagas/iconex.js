import { all, takeLatest, takeEvery, fork, put } from 'redux-saga/effects';

import { generateJsonRpcId } from '../utils/jsonrpc';
import { getIcxBalanceEvent, getTokenBalanceEvent } from '../utils/events';
import {
  RESPONSE_ADDRESS,
  ICX_BALANCE_REQUEST,
  TOKEN_BALANCE_REQUEST,
  RESPONSE_JSON_RPC,
} from '../reducers/iconex';
import { CHANGE_TOKEN } from '../reducers/tokens';

function getIcxBalance(payload) {
  const id = generateJsonRpcId();
  const event = getIcxBalanceEvent(id, payload);

  window.dispatchEvent(event);
  return id;
}

function getTokenBalance(payload, tokenAddress) {
  const id = generateJsonRpcId();
  const event = getTokenBalanceEvent(id, payload, tokenAddress);

  window.dispatchEvent(event);
  return id;
}

function* getBalance({ payload, tokenAddress }) {
  const icxId = getIcxBalance(payload);
  yield put({
    type: ICX_BALANCE_REQUEST,
    id: icxId,
  });
  const tokenId = getTokenBalance(payload, tokenAddress);
  yield put({
    type: TOKEN_BALANCE_REQUEST,
    id: tokenId,
  });
}

function* watchResponseAddress() {
  yield takeEvery(RESPONSE_ADDRESS, getBalance);
}

function* getBalanceOnlyToken({ address, token }) {
  const id = getTokenBalance(address, token);
  yield put({
    type: TOKEN_BALANCE_REQUEST,
    id,
  });
}

function* watchChangeToken() {
  yield takeLatest(CHANGE_TOKEN, getBalanceOnlyToken);
}

function* checkRpcId(action) {
  console.log('check saga', action);
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
