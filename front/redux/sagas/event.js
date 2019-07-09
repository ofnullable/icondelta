import { all, fork, put, call, takeLatest, select } from 'redux-saga/effects';

import AT from '../actionTypes';
import storage from '../../utils/storage';

const getRequestIds = state => state.event.requestIds;
const getCurrentToken = state => state.token.currentToken.data;

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
    const ids = yield select(getRequestIds);
    // const token = yield select(getCurrentToken);

    console.log('Response for', ids[payload.id]);

    switch (ids[payload.id]) {
      // response for get balance requests
      case AT.ICX_BALANCE_REQUEST_ID:
        yield put({
          type: AT.LOAD_ICX_BALANCE_SUCCESS,
          balance: payload.result,
        });
      case AT.DEPOSITED_ICX_BALANCE_REQUEST_ID:
        yield put({
          type: AT.LOAD_DEPOSITED_ICX_BALANCE_SUCCESS,
          balance: payload.result,
        });
      case AT.TOKEN_BALANCE_REQUEST_ID:
        yield put({
          type: AT.LOAD_TOKEN_BALANCE_SUCCESS,
          balance: payload.result,
        });
      case AT.DEPOSITED_TOKEN_BALANCE_REQUEST_ID:
        yield put({
          type: AT.LOAD_DEPOSITED_TOKEN_BALANCE_SUCCESS,
          balance: payload.result,
        });

      // response for deposit, withdraw
      default:
        yield put({
          type: AT.RESPONSE_COMPLETE,
          id: payload.id,
        });
        return;
    }
  } catch (e) {
    console.error(e);
  }
}
