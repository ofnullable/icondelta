import { all, fork, put, call, takeLatest } from 'redux-saga/effects';

import AT from '../actionTypes';

export default function*() {
  // yield all([fork(watchLoadOrdersRequest)]);
}

// function* watchLoadOrdersRequest() {
//   yield takeLatest(AT.LOAD_ORDER_LIST_REQUEST, loadOrders);
// }

// function* loadOrders({ symbol }) {
//   try {
//     const { data } = yield call(loadOrdersApi, symbol);
//     yield put({
//       type: AT.LOAD_ORDER_LIST_SUCCESS,
//       data,
//     });
//   } catch (e) {
//     console.error(e.response);
//     yield put({
//       type: AT.LOAD_ORDER_LIST_FAILURE,
//       error: e.response.data,
//     });
//   }
// }
