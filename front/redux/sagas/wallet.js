import { all, fork, put, call, takeLatest } from 'redux-saga/effects';

import AT from '../actionTypes';
import { getAddressApi, sendAddressApi } from '../api/request/wallet';

export default function*() {
  yield all([fork(watchLoadAddress), fork(watchGetAddressSuccess)]);
}

function* watchLoadAddress() {
  yield takeLatest(AT.LOAD_ADDRESS_REQUEST, loadAddress);
}

function* loadAddress() {
  try {
    const address = yield call(getAddressApi);

    console.log(address);

    yield put({
      type: AT.LOAD_ADDRESS_SUCCESS,
      address,
    });
  } catch (e) {
    if (e.response.status === 401) {
      // 401 status means haven't received address,
      // so just return and request address to iconex at client side
      console.warn(`No wallet address in server`);
      // return;
    }
    console.error(e.response.data);
  }
}

function* watchGetAddressSuccess() {
  yield takeLatest(AT.GET_ADDRESS_SUCCESS, sendAddress);
}

function* sendAddress({ address }) {
  try {
    yield call(sendAddressApi, { address });

    yield put({
      type: AT.LOAD_ADDRESS_SUCCESS,
      address,
    });
  } catch (e) {
    console.error(e);
  }
}
