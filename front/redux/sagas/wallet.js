import { all, fork, put, call, takeLatest, select } from 'redux-saga/effects';

import AT from '../actionTypes';
import {
  requestAddress,
  loadBalances,
  depositIcx,
  withdrawIcx,
  depositToken,
  withdrawToken,
} from '../../utils/event';
import storage from '../../utils/storage';
import { reverseObject } from '../../utils/utils';

const getAddress = state => state.wallet.address;
const getToken = state => state.token.currentToken.data;

const getDetails = function*() {
  return {
    address: yield select(getAddress) || storage.get('address'),
    token: yield select(getToken),
  };
};

export default function*() {
  yield all([
    fork(watchLoadAddressRequest),
    fork(watchLoadTokenBalanceRequest),
    fork(watchIcxDepositRequest),
    fork(watchIcxWithdrawRequest),
    fork(watchTokenDepositRequest),
    fork(watchTokenWithdrawRequest),
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
    ids: reverseObject(eventIds),
  });
}

function* watchIcxDepositRequest() {
  yield takeLatest(AT.ICX_DEPOSIT_REQUEST, icxDeposit);
}

function* icxDeposit({ amount, address }) {
  const id = depositIcx(amount, address);
}

function* watchIcxWithdrawRequest() {
  yield takeLatest(AT.ICX_WITHDRAW_REQUEST, icxWithdraw);
}

function* icxWithdraw({ amount, address }) {
  const id = withdrawIcx(amount, address);
}

function* watchTokenDepositRequest() {
  yield takeLatest(AT.TOKEN_DEPOSIT_REQUEST, tokenDeposit);
}

function* tokenDeposit({ amount, address, tokenAddress }) {
  const id = depositToken(amount, address, tokenAddress);
}

function* watchTokenWithdrawRequest() {
  yield takeLatest(AT.TOKEN_WITHDRAW_REQUEST, tokenWithdraw);
}

function* tokenWithdraw({ amount, address, tokenAddress }) {
  const id = withdrawToken(amount, address, tokenAddress);
}
