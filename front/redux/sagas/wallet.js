import { all, fork, put, call, takeLatest, select } from 'redux-saga/effects';

import AT from '../actionTypes';
import {
  requestAddress,
  depositIcxEvent,
  withdrawIcxEvent,
  depositTokenEvent,
  withdrawTokenEvent,
} from '../../utils/event';
import storage from '../../utils/storage';
import { getIcxBalance, getTokenBalance } from '../api/iconex/wallet';
import { toIcx } from '../../utils/formatter';

const getAddress = state => state.wallet.address;
const getTokens = state => state.token.tokens;

const getDetails = function*() {
  return {
    address: yield select(getAddress),
    token: yield select(getTokens),
  };
};

export default function*() {
  yield all([
    fork(watchLoadAddressRequest),
    fork(watchLoadIcxBalanceRequest),
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

function* loadAddress({ symbol }) {
  const address = yield storage.get('address');

  if (address) {
    yield put({
      type: AT.LOAD_ADDRESS_SUCCESS,
      address,
    });
    yield put({
      type: AT.LOAD_ICX_BALANCE_REQUEST,
      address,
    });
    yield put({
      type: AT.LOAD_TOKEN_BALANCE_REQUEST,
      address,
      symbol,
    });
  } else {
    requestAddress();
  }
}

function* watchLoadIcxBalanceRequest() {
  yield takeLatest(AT.LOAD_ICX_BALANCE_REQUEST, loadIcxBalance);
}

function* loadIcxBalance({ address }) {
  try {
    const balance = yield call(getIcxBalance, address);
    balance.deposited = toIcx(balance.deposited);
    balance.undeposited = toIcx(balance.undeposited);
    yield put({
      type: AT.LOAD_ICX_BALANCE_SUCCESS,
      data: balance,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: AT.LOAD_ICX_BALANCE_FAILURE,
      error: e,
    });
  }
}

function* watchLoadTokenBalanceRequest() {
  yield takeLatest(AT.LOAD_TOKEN_BALANCE_REQUEST, loadTokenBalance);
}

function* loadTokenBalance({ address, symbol }) {
  try {
    const tokens = yield select(getTokens);
    const currentToken = yield tokens.data.find(t => t.symbol === symbol);

    if (currentToken) {
      const balance = yield call(getTokenBalance, address, currentToken.address);
      balance.deposited = toIcx(balance.deposited);
      balance.undeposited = toIcx(balance.undeposited);
      yield put({
        type: AT.LOAD_TOKEN_BALANCE_SUCCESS,
        data: balance,
      });
    }
  } catch (e) {
    console.error(e);
    yield put({
      type: AT.LOAD_TOKEN_BALANCE_FAILURE,
      error: e,
    });
  }
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
