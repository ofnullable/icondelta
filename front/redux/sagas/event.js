import { all, fork, put, takeLatest, select } from 'redux-saga/effects';

import AT from '../actionTypes';
import storage from '../../utils/storage';
import { REQUEST_ID } from '../../utils/const';

const getToken = state => state.token.currentToken;
const getSockets = state => state.socket;
const getSavedOrder = state => state.order.savedOrder;

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
    console.log(`Response for ${payload.id},`, payload);

    switch (payload.id) {
      // response for get balance requests
      case REQUEST_ID.TRADE: {
        const { trade } = yield select(getSockets);
        trade.emit('trade_event', {
          event: 'checkTradeTxHash',
          params: { txHash: payload.result },
        });
      }
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
  const { order } = yield select(getSockets);
  const savedOrder = yield select(getSavedOrder);

  delete savedOrder['hashed'];
  savedOrder['signature'] = payload;

  order.emit('order_event', { event: 'createOrder', params: savedOrder }, res => console.log(res));
  yield put({
    type: AT.REMOVE_TEMPORAL_ORDER,
  });
}
