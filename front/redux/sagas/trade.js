import { all, fork, put, call, takeLatest } from 'redux-saga/effects';

import AT from '../actionTypes';
import { requestTradeEvent } from '../../utils/event';

export default function*() {
  yield all([fork(watchTradeRequest)]);
}

function* watchTradeRequest() {
  yield takeLatest(AT.TRADE_REQUEST, requestSignature);
}

function* requestSignature({ data }) {
  requestTradeEvent(data.order, { address: data.address, amount: data.amount });
}

// TODO: TRADE_SUCCESS, TRADE_FAILURE
