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
      // console.log('broadcasted order', res);
      emit(newOrderReceived(res));
      if (res.makerAddress === address) {
        emit(myNewOrderReceived(res));
      }
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
  data.socket.emit('order_event', { event: 'createOrder', params: data.tempOrder }, res =>
    console.log(res.success)
  );
  yield put(removeTemporalOrder());
}

function* writeOrder() {
  yield takeLatest(AT.ORDER_REQUEST, sendOrder);
}

function* handleOrderEvent(socket) {
  yield fork(writeOrder);
  yield fork(readOrder, socket);
}

function* cancelTask() {
  yield cancel(task);
}

function* flow({ data }) {
  const { order } = data;
  console.log('order socket:', order);
  const orderTask = yield fork(handleOrderEvent, order);
  task = orderTask;
  yield takeLatest(AT.REMOVE_SOCKET, cancelTask);
}

export default function*() {
  yield takeLatest(AT.SET_SOCKET, flow);
}
