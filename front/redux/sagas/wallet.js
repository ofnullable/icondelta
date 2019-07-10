import { all, fork, put, takeLatest, select } from 'redux-saga/effects';

import AT from '../actionTypes';
import {
  requestAddress,
  loadBalances,
  depositIcxEvent,
  withdrawIcxEvent,
  depositTokenEvent,
  withdrawTokenEvent,
} from '../../utils/event';
import storage from '../../utils/storage';
import { reverseObject } from '../../utils/utils';

const getAddress = state => state.wallet.address;
const getToken = state => state.token.currentToken.data;

const getDetails = function*() {
  return {
    address: yield select(getAddress),
    token: yield select(getToken),
  };
};

export default function*() {
  yield all([
    fork(watchLoadAddressRequest),
    fork(watchLoadTokenBalanceRequest),
    fork(watchDepositIcxRequest),
    fork(watchWithdrawIcxRequest),
    fork(watchDepositTokenRequest),
    fork(watchWithdrawTokenRequest),
  ]);
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
  const currentToken = yield select(getToken);
  const eventIds = yield loadBalances(address, currentToken.address);

  yield put({
    type: AT.JSON_RPC_REQUEST,
    id: reverseObject(eventIds),
  });
}

function* watchDepositIcxRequest() {
  yield takeLatest(AT.DEPOSIT_ICX_REQUEST, depositIcx);
}

function* depositIcx({ amount, address }) {
  const eventId = depositIcxEvent(amount, address);
}

function* watchWithdrawIcxRequest() {
  yield takeLatest(AT.WITHDRAW_ICX_REQUEST, withdrawIcx);
}

function* withdrawIcx({ amount, address }) {
  const eventId = withdrawIcxEvent(amount, address);
}

function* watchDepositTokenRequest() {
  yield takeLatest(AT.DEPOSIT_TOKEN_REQUEST, depositToken);
}

function* depositToken({ amount, address, tokenAddress }) {
  const eventId = depositTokenEvent(amount, address, tokenAddress);
}

function* watchWithdrawTokenRequest() {
  yield takeLatest(AT.WITHDRAW_TOKEN_REQUEST, withdrawToken);
}

function* withdrawToken({ amount, address, tokenAddress }) {
  const eventId = withdrawTokenEvent(amount, address, tokenAddress);
}
