import { eventChannel } from 'redux-saga';
import { fork, take, takeLatest, call, put, cancel, select } from 'redux-saga/effects';

import AT from '../../actionTypes';

let task;

function loadOrders(socket) {
  return eventChannel(emit => {
    socket.emit('order_event', { event: 'getOrders', params: { offset: 0, count: 10 } }, res => {
      console.log('get orders', res);
      if (res && res.success) {
        emit({
          type: AT.LOAD_ORDER_LIST_SUCCESS,
          data: res,
        });
      } else {
        emit({
          type: AT.LOAD_ORDER_LIST_FAILURE,
          error: res ? res.msg || 'request failure' : 'request failure',
        });
      }
    });
    return () => {};
  });
}

function* loadOrdersRequest({ socket }) {
  const channel = yield call(loadOrders, socket);

  const action = yield take(channel);
  yield put(action);
}

function* watchLoadOrders() {
  yield takeLatest(AT.LOAD_ORDER_LIST_REQUEST, loadOrdersRequest);
}

function loadMyOrders({ socket, address }) {
  return eventChannel(emit => {
    socket.emit(
      'order_event',
      { event: 'getOrdersByAddress', params: { address, offset: 0, count: 10 } },
      res => {
        console.log('get orders by address', res);
        if (res && res.success) {
          emit({
            type: AT.LOAD_ORDER_LIST_BY_ADDRESS_SUCCESS,
            data: res,
          });
        } else {
          emit({
            type: AT.LOAD_ORDER_LIST_BY_ADDRESS_FAILURE,
            error: res ? res.msg || 'request failure' : 'request failure',
          });
        }
      }
    );
    return () => {};
  });
}

function* loadMyOrdersRequest(data) {
  const channel = yield call(loadMyOrders, data);

  const action = yield take(channel);
  yield put(action);
}

function* watchLoadMyorders() {
  yield takeLatest(AT.LOAD_ORDER_LIST_BY_ADDRESS_REQUEST, loadMyOrdersRequest);
}

function loadMyTrades({ socket, address, symbol }) {
  return eventChannel(emit => {
    socket.emit(
      'trade_event',
      {
        event: 'getTradesByAddress',
        params: { address, symbol, offset: 0, count: 10 },
      },
      res => {
        console.log('get trades by address', res);
        if (res && res.success) {
          emit({
            type: AT.LOAD_TRADE_LIST_BY_ADDRESS_SUCCESS,
            data: res,
          });
        } else {
          emit({
            type: AT.LOAD_TRADE_LIST_BY_ADDRESS_FAILURE,
            error: res ? res.msg || 'request failure' : 'request failure',
          });
        }
      }
    );
    return () => {};
  });
}

function* loadMyTradesRequest({ data }) {
  const channel = yield call(loadMyTrades, data);

  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

function* watchLoadMyTrades() {
  yield takeLatest(AT.LOAD_TRADE_LIST_BY_ADDRESS_REQUEST, loadMyTradesRequest);
}

function loadLastTrades(socket) {
  return eventChannel(emit => {
    socket.emit('trade_event', { event: 'getLatestTokenTrades', params: {} }, res => {
      console.log('get last trades of each token', res);
      if (res && res.success) {
        emit({
          type: AT.LOAD_LAST_TRADE_BY_TOKEN_SUCCESS,
          data: res,
        });
      } else {
        emit({
          type: AT.LOAD_LAST_TRADE_BY_TOKEN_FAILURE,
          error: res ? res.msg || 'request failure' : 'request failure',
        });
      }
    });
    return () => {};
  });
}

function* loadLastTradesRequest({ socket }) {
  const channel = yield call(loadLastTrades, socket);
  const action = yield take(channel);
  yield put(action);
}

function* watchLoadLastTrades() {
  yield takeLatest(AT.LOAD_LAST_TRADE_BY_TOKEN_REQUEST, loadLastTradesRequest);
}

function* handleHistoryEvent() {
  yield fork(watchLoadOrders);
  yield fork(watchLoadMyorders);
  yield fork(watchLoadMyTrades);
  yield fork(watchLoadLastTrades);
}

function* flow() {
  const historyTask = yield fork(handleHistoryEvent);
  task = historyTask;
}

function* cancelTask() {
  yield cancel(task);
}

export default function*() {
  yield takeLatest(AT.SET_SOCKET, flow);
  yield takeLatest(AT.REMOVE_SOCKET, cancelTask);
}
