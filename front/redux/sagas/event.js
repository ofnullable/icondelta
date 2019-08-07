import { all, fork, put, takeLatest, select } from 'redux-saga/effects';

import AT from '../actionTypes';
import storage from '../../utils/storage';
import { ICONEX_REQUEST_ID } from '../../utils/const';
import { requestSignatureEvent, requestTradeEvent } from '../../utils/event';

const getToken = state => state.token.currentToken;
const getSockets = state => state.socket.sockets;
const getTempOrder = state => state.order.tempOrder;

export default function*() {
  yield all([
    fork(watchAddressResponse),
    fork(watchJsonRpcResponse),
    fork(watchSigningRequest),
    fork(watchSigningResponse),
    fork(watchTradeRequest),
  ]);
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
        yield put({
          type: AT.CHECK_TRADE_REQUEST,
          data: { txHash: payload.result, socket: trade },
        });
      }
      default:
        break;
    }
  } catch (e) {
    console.error(e);
  }
}

function* watchSigningRequest() {
  yield takeLatest(AT.REQUEST_SIGNING, makeSignature);
}

function* makeSignature({ address, data }) {
  yield put({
    type: AT.SAVE_TEMPORAL_ORDER,
    data,
  });
  requestSignatureEvent(address, data.hashed);
}

function* watchSigningResponse() {
  yield takeLatest(AT.RESPONSE_SIGNING, orderRequest);
}

function* orderRequest({ payload }) {
  const { order } = yield select(getSockets);
  const tempOrder = yield select(getTempOrder);

  delete tempOrder['hashed'];
  tempOrder['signature'] = payload;

  yield put({
    type: AT.ORDER_REQUEST,
    data: { tempOrder, socket: order },
  });
}

function* watchTradeRequest() {
  yield takeLatest(AT.REQUEST_TRADE, tradeRequest);
}

function* tradeRequest({ data }) {
  requestTradeEvent(data.order, { address: data.address, amount: data.amount });
}
