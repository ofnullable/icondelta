import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.withCredentials = true;

import wallet from './wallet';
import token from './token';
import event from './event';

export default function*() {
  yield all([fork(wallet), fork(token), fork(event)]);
}
