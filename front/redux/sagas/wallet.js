import { all, fork, put, call, takeLatest, select } from 'redux-saga/effects';

import AT from '../actionTypes';
import { requestAddress, loadBalances } from '../../utils/event';
import storage from '../../utils/storage';
import { reverseObject } from '../../utils/utils';

const token = state => state.token.currentToken.data;

export default function*() {
  yield all([fork(watchLoadAddressRequest), fork(watchLoadTokenBalanceRequest)]);
}

function* watchLoadAddressRequest() {
  yield takeLatest(AT.LOAD_ADDRESS_REQUEST, loadAddress);
}

function* loadAddress() {
  const address = yield storage.get('address');
  if (address) {
    yield put({
      type: AT.LOAD_ADDRESS_SUCCESS,
      address,
    });
    yield put({
      type: AT.LOAD_BALANCE_REQUEST,
      address,
    });
  } else {
    requestAddress();
  }
}

function* watchLoadTokenBalanceRequest() {
  yield takeLatest(AT.LOAD_BALANCE_REQUEST, loadTokenBalance);
}

function* loadTokenBalance({ address }) {
  const currentToken = yield select(token);
  const eventIds = yield loadBalances(address, currentToken.address);

  yield put({
    type: AT.JSON_RPC_REQUEST,
    ids: reverseObject(eventIds),
  });
}
