import { eventChannel } from 'redux-saga';
import { fork, take, takeLatest, call, put, cancel, select } from 'redux-saga/effects';

import AT from '../../actionTypes';
import { newOrderReceived, removeTemporalOrder } from '../../actions/orderActions';
import { myNewOrderReceived } from '../../actions/historyAction';

const getAddress = state => state.wallet.address;

let task;

function subscribeOrder(socket, address) {
  return eventChannel(emit => {
    socket.on('order_event', res => {
      console.log('broadcasted order', res);
      emit(newOrderReceived(res));
      if (res.makerAddress === address) {
        emit(myNewOrderReceived(res));
      }
    });
    socket.on('order:createOrder', res => {
      console.log('order:createOrder', res);
      // emit(newOrderReceived(res));
      // if (res.makerAddress === address) {
      //   emit(myNewOrderReceived(res));
      // }
    });
    socket.on('order:updateOrder', res => {
      console.log('order:updateOrder', res);
      // emit(updateOrderReceived(res));
      // if (res.makerAddress === address) {
      //   emit(myNewOrderReceived(res));
      // }
    });
    socket.on('order:getOrders', res => {
      console.log('order:getOrders', res);
    });
    return () => {};
  });
}

function* readOrder(socket) {
  const address = yield select(getAddress);
  const channel = yield call(subscribeOrder, socket, address);

  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

function* sendOrder({ data }) {
  const sid = data.socket.io.engine.id;
  data.socket.emit('order_event', { sid, event: 'createOrder', params: data.tempOrder });
  yield put(removeTemporalOrder());
}

function* writeOrder() {
  yield takeLatest(AT.ORDER_REQUEST, sendOrder);
}

function* handleOrderEvent(socket) {
  yield fork(writeOrder);
  yield fork(readOrder, socket);
}

function* flow({ data }) {
  const { order } = data;
  console.log('order socket:', order);
  const orderTask = yield fork(handleOrderEvent, order);
  task = orderTask;
}

function* cancelTask() {
  yield cancel(task);
}

export default function*() {
  yield takeLatest(AT.SET_SOCKET, flow);
  yield takeLatest(AT.REMOVE_SOCKET, cancelTask);
}
