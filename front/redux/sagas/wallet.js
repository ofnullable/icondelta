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

const getSymbol = state => state.token.currentToken.symbol;
const getTokens = state => state.token.tokens;

export default function*() {
  yield all([
    fork(watchLoadAddressRequest),
    fork(watchLoadWalletBalanceRequest),
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
  const symbol = yield select(getSymbol);

  if (address) {
    yield put({
      type: AT.LOAD_ADDRESS_SUCCESS,
      address,
    });
    yield put({
      type: AT.LOAD_WALLET_BALANCE_REQEUST,
      address,
      symbol,
    });
  } else {
    requestAddress();
  }
}

function* watchLoadWalletBalanceRequest() {
  yield takeLatest(AT.LOAD_WALLET_BALANCE_REQEUST, loadWalletBalance);
}

function* loadWalletBalance({ address, symbol }) {
  let icxBalance, tokenBalance;
  try {
    const tokens = yield select(getTokens);
    const currentToken = yield tokens.data.find(t => t.symbol === symbol);

    icxBalance = yield call(getIcxBalance, address);

    tokenBalance = yield call(getTokenBalance, address, currentToken.address);

    yield put({
      type: AT.LOAD_WALLET_BALANCE_SUCCESS,
      icx: icxBalance,
      token: tokenBalance,
    });
  } catch (e) {
    console.error(e);

    if (icxBalance) {
      yield put({
        type: AT.LOAD_TOKEN_BALANCE_FAILURE,
        icx: icxBalance,
        error: e.message || e,
      });
      return;
    } else if (tokenBalance) {
      yield put({
        type: AT.LOAD_ICX_BALANCE_FAILURE,
        token: tokenBalance,
        error: e.message || e,
      });
      return;
    } else {
      yield put({
        type: AT.LOAD_WALLET_BALANCE_FAILURE,
        error: e.message || e,
      });
    }
  }
}

function* watchDepositIcxRequest() {
  yield takeLatest(AT.DEPOSIT_ICX_REQUEST, depositIcx);
}

function* depositIcx({ amount, address }) {
  depositIcxEvent(amount, address);
}

function* watchWithdrawIcxRequest() {
  yield takeLatest(AT.WITHDRAW_ICX_REQUEST, withdrawIcx);
}

function* withdrawIcx({ amount, address }) {
  withdrawIcxEvent(amount, address);
}

function* watchDepositTokenRequest() {
  yield takeLatest(AT.DEPOSIT_TOKEN_REQUEST, depositToken);
}

function* depositToken({ amount, address, tokenAddress }) {
  depositTokenEvent(amount, address, tokenAddress);
}

function* watchWithdrawTokenRequest() {
  yield takeLatest(AT.WITHDRAW_TOKEN_REQUEST, withdrawToken);
}

function* withdrawToken({ amount, address, tokenAddress }) {
  withdrawTokenEvent(amount, address, tokenAddress);
}
