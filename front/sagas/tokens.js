import { all, takeLatest, put, fork } from 'redux-saga/effects';
import { CHANGE_TOKEN } from '../reducers/tokens';

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
    console.log('token', token);
    yield changeTokenApi(token);
  } catch (e) {
    console.error(e);
  }
}

function* watchChangeToken() {
  yield takeLatest(CHANGE_TOKEN, changeToken);
}

export default function*() {
  yield all([fork(watchChangeToken)]);
}
