import { all, fork, put, call, takeLatest } from 'redux-saga/effects';

import AT from '../actionTypes';

export default function*() {
  yield all([fork(watchResponseAddress), fork(watchResponseEvent)]);
}

function* watchResponseAddress() {
  yield takeLatest(AT.RESPONSE_ADDRESS, responseAddress);
}

function* responseAddress({ payload }) {
  try {
    yield put({
      type: AT.GET_ADDRESS_SUCCESS,
      address: payload,
    });
  } catch (e) {
    console.error(e);
  }
}

function* watchResponseEvent() {
  yield takeLatest(AT.RESPONSE_JSON_RPC, responseEvent);
}

function* responseEvent() {
  try {
  } catch (e) {
    console.error(e);
  }
}
