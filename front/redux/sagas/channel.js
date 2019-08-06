import { eventChannel } from 'redux-saga';
import { fork, take, call, put, cancel, select } from 'redux-saga/effects';

import AT from '../actionTypes';
import { setTokenPrice } from '../actions/tokenActions';
import { loadWalletBalance } from '../actions/walletActions';
import { newOrderReceived } from '../actions/orderActions';
import { myNewOrderReceived, myNewTradeReceived } from '../actions/historyAction';

const getAddress = state => state.wallet.address;
const getCurrentToken = state => state.token.currentToken;
const getSockets = state => state.socket.sockets;

function subscribeOrder(socket, address) {
  return eventChannel(emit => {
    socket.on('order_event', res => {
      console.log('broadcasted order', res);
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
      console.log('broadcasted trade', res);

      emit(setTokenPrice(res));
      if (
        res.takerAddress === data.address ||
        (res.makerAddress ? res.makerAddress === data.address : false)
      ) {
        emit(myNewTradeReceived(res));
      }
      emit(loadWalletBalance(data));
    });
    return () => {};
  });
}

// function* writeTrade(socket) {
//   return eventChannel(emit => {
//       const {payload} = yield take(AT.LOAD_TRADE_LIST_REQUEST)
//     socket.emit('trade_event', res => console.log(res));
//   });
// }

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
  const channel = yield call(subscribeTrade, socket, { address, symbol: currentToken.symbol });

  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

function* handleOrderEvent(socket) {
  yield fork(readOrder, socket);
}
function* handleTradeEvent(socket) {
  yield fork(readTrade, socket);
  //   yield fork(writeTrade, socket);
}

export default function*() {
  while (true) {
    yield take(AT.SET_SOCKET);
    const { order, trade } = yield select(getSockets);
    console.log('when?', order, trade);

    const orderTask = yield fork(handleOrderEvent, order);
    const tradeTask = yield fork(handleTradeEvent, trade);

    yield take(AT.REMOVE_SOCKET);
    yield cancel(orderTask);
    yield cancel(tradeTask);
  }
}
