import { all, takeEvery, fork, put, select } from 'redux-saga/effects';
import actionTypes from '../redux/actionTypes';

export const token = state => state.tokens.selectedToken;
export const orderRequests = state => state.order.jsonRpcIds;

function* checkRpcId(action) {
  const orderIds = yield select(orderRequests);
  const { address } = yield select(token);
  const { payload } = action;

  switch (orderIds[payload.id]) {
    case actionTypes.LOAD_BUY_ORDER_REQUEST_ID:
      yield put({
        type: actionTypes.LOAD_BUY_ORDER_SUCCESS,
        id: payload.id,
        orders: payload.result,
        address,
      });
      return;
    case actionTypes.LOAD_SELL_ORDER_REQUEST_ID:
      yield put({
        type: actionTypes.LOAD_SELL_ORDER_SUCCESS,
        id: payload.id,
        orders: payload.result,
        address,
      });
      return;
  }
}

function* watchJsonRpcResponse() {
  yield takeEvery(actionTypes.RESPONSE_JSON_RPC, checkRpcId);
}

export default function*() {
  yield all([fork(watchJsonRpcResponse)]);
}
