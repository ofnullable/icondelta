import { all, fork } from 'redux-saga/effects';

import wallet from './wallet';
import token from './token';
import order from './order';
import event from './event';

import channel from './channel';

export default function*() {
  yield all([fork(wallet), fork(token), fork(order), fork(event), fork(channel)]);
}
