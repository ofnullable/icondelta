import { all, fork, put, call, takeLatest } from 'redux-saga/effects';

import AT from '../actionTypes';
import { getTokens } from '../api/request/tokens';

export default function*() {
  yield all([fork(watchLoadTokensRequest)]);
}

function* watchLoadTokensRequest() {
  yield takeLatest(AT.LOAD_TOKEN_LIST_REQUEST, loadTokens);
}

function* loadTokens() {
  try {
    const tokenList = yield call(getTokens);
    console.log(tokenList);
    yield put({
      type: AT.LOAD_TOKEN_LIST_SUCCESS,
      tokenList,
    });
  } catch (e) {
    console.error(e.response.data);
  }
}
