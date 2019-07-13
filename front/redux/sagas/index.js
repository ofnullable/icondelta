import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8010/api';

import wallet from './wallet';
import token from './token';
import order from './order';
import event from './event';

export default function*() {
  yield all([fork(wallet), fork(token), fork(order), fork(event)]);
}
