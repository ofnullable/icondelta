import { all, takeEvery, fork, put, select } from 'redux-saga/effects';
import { RESPONSE_JSON_RPC } from '../reducers/iconex';
import {
  LOAD_BUY_ORDER_REQUEST_ID,
  LOAD_SELL_ORDER_REQUEST_ID,
  LOAD_BUY_ORDER_SUCCESS,
  LOAD_SELL_ORDER_SUCCESS,
} from '../reducers/order';

export const token = state => state.tokens.selectedToken;
export const orderRequests = state => state.order.jsonRpcIds;

function* checkRpcId(action) {
  const orderIds = yield select(orderRequests);
  const { address } = yield select(token);
  const { payload } = action;

  switch (orderIds[payload.id]) {
    case LOAD_BUY_ORDER_REQUEST_ID:
      yield put({
        type: LOAD_BUY_ORDER_SUCCESS,
        id: payload.id,
        orders: payload.result,
        address,
      });
      return;
    case LOAD_SELL_ORDER_REQUEST_ID:
      yield put({
        type: LOAD_SELL_ORDER_SUCCESS,
        id: payload.id,
        orders: payload.result,
        address,
      });
      return;
    default:
      break;
  }
}

function* watchJsonRpcResponse() {
  yield takeEvery(RESPONSE_JSON_RPC, checkRpcId);
}

export default function*() {
  yield all([fork(watchJsonRpcResponse)]);
}
