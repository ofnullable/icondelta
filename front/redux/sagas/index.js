import { all, fork } from 'redux-saga/effects';

import wallet from './wallet';
import token from './token';
import order from './order';
import event from './event';

import orderChannel from './channel/orderChannel';
import tradeChannel from './channel/tradeChannel';
import historyChannel from './channel/historyChannel';

export default function*() {
  yield all([
    fork(wallet),
    fork(token),
    fork(order),
    fork(event),
    fork(orderChannel),
    fork(tradeChannel),
    fork(historyChannel),
  ]);
}
