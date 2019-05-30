import { all, takeLatest, delay, fork } from 'redux-saga/effects';
import { REQUEST_ADDRESS } from '../reducers/iconex';

function testApi() {
  console.log('test api');
}

function* test() {
  try {
    yield testApi();
    yield yield delay(2000);
  } catch (e) {
    console.error(e);
  }
}

function* watchEditNickname() {
  yield takeLatest(REQUEST_ADDRESS, test);
}

export default function* testSage() {
  yield all([fork(watchEditNickname)]);
}
