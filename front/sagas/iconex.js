import { all, takeLatest, takeEvery, fork, put } from 'redux-saga/effects';

import {
  SEND_QUERY,
  GET_TOKEN_BALANCE,
  generateJsonRpcParam,
  generateJsonRpcId,
} from '../utils/jsonrpc';
import {
  iconexEvent,
  REQUEST_JSON_RPC,
  getIcxBalanceEvent,
  getTokenBalanceEvent,
} from '../utils/events';
import {
  RESPONSE_ADDRESS,
  ICX_BALANCE_REQUEST,
  TOKEN_BALANCE_REQUEST,
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
  console.log('icxId', icxId);
  yield put({
    type: ICX_BALANCE_REQUEST,
    id: icxId,
  });
  const tokenId = getTokenBalance(payload, tokenAddress);
  console.log('tokenId', tokenId);
  yield put({
    type: TOKEN_BALANCE_REQUEST,
    id: tokenId,
  });
}

function* watchResponseAddress() {
  yield takeEvery(RESPONSE_ADDRESS, getBalance);
}

function* watchChangeToken() {
  yield takeLatest(CHANGE_TOKEN, getBalance);
}

export default function*() {
  yield all([fork(watchResponseAddress), fork(watchChangeToken)]);
}
