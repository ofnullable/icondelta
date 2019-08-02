import { all, fork, put, call, takeLatest, select } from 'redux-saga/effects';

import AT from '../actionTypes';
import { loadTokensApi } from '../api/request/tokens';

const getTokens = state => state.token.tokens.data;

export default function*() {
  yield all([fork(watchLoadTokensRequest)]);
}

function* watchLoadTokensRequest() {
  yield takeLatest(AT.LOAD_TOKEN_LIST_REQUEST, loadTokens);
}

function* loadTokens({ symbol }) {
  try {
    const { data } = yield call(loadTokensApi);
    yield put({
      type: AT.LOAD_TOKEN_LIST_SUCCESS,
      data,
    });

    const currentToken = data.find(d => d.symbol === symbol);
    yield put({
      type: AT.SET_CURRENT_TOKEN_INFO,
      data: currentToken,
    });
  } catch (e) {
    console.error(e.response);
  }
}
