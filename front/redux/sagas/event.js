import { all, fork, put, takeLatest, select } from 'redux-saga/effects';

import AT from '../actionTypes';
import storage from '../../utils/storage';
import { ICONEX_REQUEST_ID } from '../../utils/const';

const getToken = state => state.token.currentToken;
const getSockets = state => state.socket.sockets;
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
    type: AT.LOAD_WALLET_BALANCE_REQEUST,
    address: payload,
    symbol: token.symbol,
  });
}

function* watchJsonRpcResponse() {
  yield takeLatest(AT.RESPONSE_JSON_RPC, dispatchAction);
}

function* dispatchAction({ payload }) {
  try {
    // console.log(`Response for ${payload.id},`, payload);
    switch (payload.id) {
      case ICONEX_REQUEST_ID.DEPOSIT_ICX:
      case ICONEX_REQUEST_ID.DEPOSIT_TOKEN:
      case ICONEX_REQUEST_ID.WITHDRAW_ICX:
      case ICONEX_REQUEST_ID.WITHDRAW_TOKEN: {
        // How can get updated balance?
        break;
      }
      case ICONEX_REQUEST_ID.TRADE: {
        const { trade } = yield select(getSockets);
        trade.emit(
          'trade_event',
          {
            event: 'checkTradeTxHash',
            params: { txHash: payload.result },
          },
          res => console.log(res)
        );
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
