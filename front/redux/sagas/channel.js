import { eventChannel } from 'redux-saga';
import { fork, take, takeLatest, call, put, cancel, select } from 'redux-saga/effects';

import AT from '../actionTypes';
import { setTokenPrice } from '../actions/tokenActions';
import { loadWalletBalance } from '../actions/walletActions';
import { newOrderReceived, removeTemporalOrder } from '../actions/orderActions';
import { myNewOrderReceived, myNewTradeReceived } from '../actions/historyAction';

const getAddress = state => state.wallet.address;
const getCurrentToken = state => state.token.currentToken;

let tasks;

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

function subscribeTrade(socket, data) {
  return eventChannel(emit => {
    socket.on('trade_event', res => {
      // console.log('broadcasted trade', res);
      emit(setTokenPrice(res));
      if (
        res.tokenAddress === data.token.address &&
        (res.takerAddress === data.address || res.makerAddress === data.address)
      ) {
        emit(myNewTradeReceived(res));
      }
      emit(loadWalletBalance({ address: data.address, symbol: data.token.symbol }));
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

function* readTrade(socket) {
  const address = yield select(getAddress);
  const currentToken = yield select(getCurrentToken);
  const channel = yield call(subscribeTrade, socket, { address, token: currentToken });

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

function* sendTxHash({ data }) {
  data.socket.emit(
    'trade_event',
    { event: 'checkTradeTxHash', params: { txHash: data.txHash } },
    res => console.log(res)
  );
}

function* writeOrder() {
  yield takeLatest(AT.ORDER_REQUEST, sendOrder);
}

function* checkTrade() {
  yield takeLatest(AT.CHECK_TRADE_REQUEST, sendTxHash);
}

function* handleOrderEvent(socket) {
  yield fork(writeOrder);
  yield fork(readOrder, socket);
}
function* handleTradeEvent(socket) {
  yield fork(checkTrade);
  yield fork(readTrade, socket);
}

function* cancelTask() {
  yield cancel(tasks.orderTask);
  yield cancel(tasks.tradeTask);
}

function* flow({ data }) {
  const { order, trade } = data;
  const orderTask = yield fork(handleOrderEvent, order);
  const tradeTask = yield fork(handleTradeEvent, trade);
  tasks = { orderTask, tradeTask };
  yield takeLatest(AT.REMOVE_SOCKET, cancelTask);
}

export default function*() {
  yield takeLatest(AT.SET_SOCKET, flow);
}
