import {
  all,
  takeLatest,
  takeEvery,
  fork,
  put,
  select,
} from 'redux-saga/effects';

import { generateJsonRpcId } from '../utils/jsonrpc';
import { getIcxBalanceEvent, getTokenBalanceEvent } from '../utils/events';
import {
  RESPONSE_ADDRESS,
  ICX_BALANCE_REQUEST,
  TOKEN_BALANCE_REQUEST,
  RESPONSE_JSON_RPC,
  ICX_BALANCE_REQUEST_ID,
  TOKEN_BALANCE_REQUEST_ID,
  ICX_BALANCE_SUCCESS,
  TOKEN_BALANCE_SUCCESS,
} from '../reducers/iconex';
import { CHANGE_TOKEN } from '../reducers/tokens';

export const jsonRpcIds = state => state.iconex.jsonRpcIds;

function getIcxBalance(address) {
  const id = generateJsonRpcId();
  const event = getIcxBalanceEvent(id, address);

  window.dispatchEvent(event);
  return id;
}

function getTokenBalance(address, tokenAddress) {
  const id = generateJsonRpcId();
  const event = getTokenBalanceEvent(id, address, tokenAddress);

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
  const id = getTokenBalance(address, token.address);
  yield put({
    type: TOKEN_BALANCE_REQUEST,
    id,
  });
}

function* watchChangeToken() {
  yield takeLatest(CHANGE_TOKEN, getBalanceOnlyToken);
}

function* checkRpcId(action) {
  const ids = yield select(jsonRpcIds);
  console.log('check saga', action);
  switch (ids[action.payload.id]) {
    case ICX_BALANCE_REQUEST_ID:
      yield put({
        type: ICX_BALANCE_SUCCESS,
        balance: action.payload.result,
      });
      break;
    case TOKEN_BALANCE_REQUEST_ID:
      yield put({
        type: TOKEN_BALANCE_SUCCESS,
        balance: action.payload.result,
      });
      break;
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
