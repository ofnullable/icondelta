import { all, fork, put, call, takeLatest } from 'redux-saga/effects';

import AT from '../actionTypes';
import storage from '../../utils/storage';

export default function*() {
  yield all([fork(watchAddressResponse), fork(watchEventResponse)]);
}

function* watchAddressResponse() {
  yield takeLatest(AT.RESPONSE_ADDRESS, setAddress);
}

function* setAddress({ payload }) {
  try {
    yield storage.set('address', payload);
    yield put({
      type: AT.LOAD_ADDRESS_SUCCESS,
      address: payload,
    });
  } catch (e) {
    console.error(e);
  }
}

function* watchEventResponse() {
  yield takeLatest(AT.RESPONSE_JSON_RPC, dispatchAction);
}

function* dispatchAction() {
  try {
  } catch (e) {
    console.error(e);
  }
}
