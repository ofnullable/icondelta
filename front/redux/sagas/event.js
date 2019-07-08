import { all, fork, put, call, takeLatest, select } from 'redux-saga/effects';

import AT from '../actionTypes';
import storage from '../../utils/storage';

const requestIds = state => state.event.requestIds;

export default function*() {
  yield all([fork(watchAddressResponse), fork(watchEventResponse)]);
}

function* watchAddressResponse() {
  yield takeLatest(AT.RESPONSE_ADDRESS, setAddress);
}

function* setAddress({ payload }) {
  yield storage.set('address', payload);
  yield put({
    type: AT.LOAD_ADDRESS_SUCCESS,
    address: payload,
  });
  yield put({
    type: AT.LOAD_BALANCE_REQUEST,
    address: payload,
  });
}

function* watchEventResponse() {
  yield takeLatest(AT.RESPONSE_JSON_RPC, dispatchAction);
}

function* dispatchAction({ payload }) {
  try {
    const ids = yield select(requestIds);
    switch (ids[payload.id]) {
      case AT.ICX_BALANCE_REQUEST_ID: {
      }
      default:
        return;
    }
  } catch (e) {
    console.error(e);
  }
}
