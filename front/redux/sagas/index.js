import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/api';

import wallet from './wallet';

export default function*() {
  yield all([fork(wallet)]);
}
