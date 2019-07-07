import { all, fork, put, call, takeLatest } from 'redux-saga/effects';

import AT from '../actionTypes';
import { loadTokensApi } from '../api/request/tokens';

export default function*() {
  yield all([fork(watchLoadTokensRequest)]);
}

function* watchLoadTokensRequest() {
  yield takeLatest(AT.LOAD_TOKEN_LIST_REQUEST, loadTokens);
}

function* loadTokens({ symbol }) {
  try {
    const { data } = yield call(loadTokensApi);
    const currentToken = data.find(d => d.symbol === symbol);
    yield put({
      type: AT.LOAD_TOKEN_LIST_SUCCESS,
      data,
    });
    yield put({
      type: AT.CHANGE_TOKEN,
      data: currentToken,
    });
  } catch (e) {
    console.error(e.response.data);
  }
}
