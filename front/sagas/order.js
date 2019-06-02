import { all, takeEvery, fork, put } from 'redux-saga/effects';

import {
  SEND_QUERY,
  GET_ICX_BALANCE,
  GET_TOKEN_BALANCE,
  generateJsonRpcParam,
  generateJsonRpcId,
} from '../utils/jsonrpc';
import { iconexEvent, REQUEST_JSON_RPC } from '../utils/events';
import {
  RESPONSE_ADDRESS,
  ICX_BALANCE_REQUEST,
  TOKEN_BALANCE_REQUEST,
} from '../reducers/iconex';

function getIcxBalance(payload) {
  const id = generateJsonRpcId();
  const getIcxBalanceEvent = iconexEvent(
    REQUEST_JSON_RPC,
    generateJsonRpcParam(id, GET_ICX_BALANCE, { address: payload })
  );
  window.dispatchEvent(getIcxBalanceEvent);
  return id;
}

function getTokenBalance(payload, tokenAddress) {
  const id = generateJsonRpcId();
  const getTokenBalanceEvent = iconexEvent(
    REQUEST_JSON_RPC,
    generateJsonRpcParam(id, SEND_QUERY, {
      from: payload,
      to: tokenAddress,
      dataType: 'call',
      data: {
        method: GET_TOKEN_BALANCE,
        params: { address: payload },
      },
    })
  );
  window.dispatchEvent(getTokenBalanceEvent);
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
