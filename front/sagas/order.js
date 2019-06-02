import { all, takeEvery, fork, put } from 'redux-saga/effects';

import { generateJsonRpcId } from '../utils/jsonrpc';
import { getIcxBalanceEvent, getTokenBalanceEvent } from '../utils/events';
import {
  RESPONSE_ADDRESS,
  ICX_BALANCE_REQUEST,
  TOKEN_BALANCE_REQUEST,
} from '../reducers/iconex';

function getIcxBalance(payload) {
  const id = generateJsonRpcId();
  const getIcxBalance = getIcxBalanceEvent(id, payload);

  window.dispatchEvent(getIcxBalance);
  return id;
}

function getTokenBalance(payload, tokenAddress) {
  const id = generateJsonRpcId();
  const getTokenBalance = getTokenBalanceEvent(id, payload, tokenAddress);

  window.dispatchEvent(getTokenBalance);
  return id;
}

function* getBalance({ payload, tokenAddress }) {
  try {
    const icxId = yield getIcxBalance(payload);
    console.log('icxId', icxId);
    yield put({
      type: ICX_BALANCE_REQUEST,
      id: icxId,
    });
    const tokenId = yield getTokenBalance(payload, tokenAddress);
    console.log('tokenId', tokenId);
    yield put({
      type: TOKEN_BALANCE_REQUEST,
      id: tokenId,
    });
  } catch (e) {
    console.error(e);
  }
}

function* watchChangeToken() {
  yield takeEvery(RESPONSE_ADDRESS, getBalance);
}

export default function*() {
  yield all([fork(watchChangeToken)]);
}
