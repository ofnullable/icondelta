import { all, fork, put, takeLatest, select } from 'redux-saga/effects';

import AT from '../actionTypes';
import storage from '../../utils/storage';

const getToken = state => state.token.currentToken;
const getOrderSocket = state => state.socket.sockets.order;
const getRequestIds = state => state.event.requestIds;

export default function*() {
  yield all([fork(watchAddressResponse), fork(watchJsonRpcResponse), fork(watchSigningResponse)]);
}

function* watchAddressResponse() {
  yield takeLatest(AT.RESPONSE_ADDRESS, setAddress);
}

function* setAddress({ payload }) {
  yield storage.set('address', payload);
  const token = yield select(getToken);
  yield put({
    type: AT.LOAD_ADDRESS_SUCCESS,
    address: payload,
  });
  yield put({
    type: AT.LOAD_ICX_BALANCE_REQUEST,
    address: payload,
  });
  yield put({
    type: AT.LOAD_TOKEN_BALANCE_REQUEST,
    address: payload,
    symbol: token.symbol,
  });
}

function* watchJsonRpcResponse() {
  yield takeLatest(AT.RESPONSE_JSON_RPC, dispatchAction);
}

function* dispatchAction({ payload }) {
  try {
    const ids = yield select(getRequestIds);
    // const token = yield select(getToken);

    console.log(`Response for ${ids[payload.id]},`, payload);

    switch (ids[payload.id]) {
      // response for get balance requests

      default:
        break;
    }
  } catch (e) {
    console.error(e);
  }
}

function* watchSigningResponse() {
  yield takeLatest(AT.RESPONSE_SIGNING, emitOrder);
}

function* emitOrder({ payload }) {
  const orderSocket = yield select(getOrderSocket);
  const signature = payload;
}
