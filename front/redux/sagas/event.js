import { all, fork, put, call, takeLatest, select } from 'redux-saga/effects';

import AT from '../actionTypes';
import storage from '../../utils/storage';

const getRequestIds = state => state.event.requestIds;
const getToken = state => state.token.currentToken.data;

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
    // const token = yield select(getToken);

    console.log(`Response for ${ids[payload.id]},`, payload);

    switch (ids[payload.id]) {
      // response for get balance requests
      case AT.ICX_BALANCE_REQUEST_ID:
        yield put({
          type: AT.LOAD_ICX_BALANCE_SUCCESS,
          balance: payload.result,
        });
        break;
      case AT.DEPOSITED_ICX_BALANCE_REQUEST_ID:
        yield put({
          type: AT.LOAD_DEPOSITED_ICX_BALANCE_SUCCESS,
          balance: payload.result,
        });
        break;
      case AT.TOKEN_BALANCE_REQUEST_ID:
        yield put({
          type: AT.LOAD_TOKEN_BALANCE_SUCCESS,
          balance: payload.result,
        });
        break;
      case AT.DEPOSITED_TOKEN_BALANCE_REQUEST_ID:
        yield put({
          type: AT.LOAD_DEPOSITED_TOKEN_BALANCE_SUCCESS,
          balance: payload.result,
        });
        break;

      default:
        break;
    }
    // for remove response id
    yield put({
      type: AT.RESPONSE_COMPLETE,
      id: payload.id,
    });
  } catch (e) {
    console.error(e);
  }
}
