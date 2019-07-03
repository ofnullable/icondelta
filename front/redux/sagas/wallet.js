import { all, fork, put, call, takeLatest } from 'redux-saga/effects';

import AT from '../actionTypes';
import { getAddressApi } from '../api/request/wallet';

export default function*() {
  yield all([fork(watchLoadAddress)]);
}

function* watchLoadAddress() {
  yield takeLatest(AT.LOAD_ADDRESS_REQUEST, loadAddress);
}

function* loadAddress() {
  try {
    const address = yield call(getAddressApi);

    yield put({
      type: AT.LOAD_ADDRESS_SUCCESS,
      address,
    });
  } catch (e) {
    // TODO: iconex request
    // yield put({});
    // console.error(e);
  }
}
