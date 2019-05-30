import { all, takeLatest, put, fork, delay } from 'redux-saga/effects';
import {
  CHANGE_TOKEN_REQUEST,
  CHANGE_TOKEN_SUCCESS,
  CHANGE_TOKEN_FAILURE,
} from '../reducers/tokens';

const dummyHistory = {
  DAI: [],
  EOS: [],
  AIR: [],
};

function changeTokenApi(token) {
  console.log('change token api', token);
}

function* changeToken({ token }) {
  try {
    yield changeTokenApi(token);
    yield yield delay(2000);
    yield put({
      type: CHANGE_TOKEN_SUCCESS,
      data: dummyHistory[token.symbol],
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: CHANGE_TOKEN_FAILURE,
    });
  }
}

function* watchChangeToken() {
  yield takeLatest(CHANGE_TOKEN_REQUEST, changeToken);
}

export default function* testSage() {
  yield all([fork(watchChangeToken)]);
}
