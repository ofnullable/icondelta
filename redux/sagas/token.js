import { all, fork, put, call, takeLatest, select } from 'redux-saga/effects';

import AT from '../actionTypes';
import { loadTokensApi } from '../api/server/tokens';

const getTokens = state => state.token.tokens.data;

export default function*() {
  yield all([fork(watchLoadTokensRequest)]);
}

function* watchLoadTokensRequest() {
  yield takeLatest(AT.LOAD_TOKEN_LIST_REQUEST, loadTokens);
}

function* loadTokens({ symbol }) {
  try {
    let tokens = yield select(getTokens);

    if (!tokens.length) {
      const { data } = yield call(loadTokensApi);
      yield put({
        type: AT.LOAD_TOKEN_LIST_SUCCESS,
        data,
      });
      tokens = data;
    }

    const currentToken = tokens.find(d => d.symbol === symbol);
    if (currentToken) {
      yield put({
        type: AT.SET_CURRENT_TOKEN,
        data: currentToken,
      });
    } else {
      // To prevent showing undefined
      yield put({
        type: AT.SET_CURRENT_TOKEN_SYMBOL,
        symbol,
      });
    }
  } catch (e) {
    console.error(e.response);
  }
}
