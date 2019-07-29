import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { fork, takeLatest, call, put, cancel, select } from 'redux-saga/effects';

const BASE_URL = 'https://api.icondelta.ga';
const getCurrentSymbol = state => state.token.currentToken.symbol;

export default function*() {
  yield all([fork(flow)]);
}

function connect(symbol) {
  const socket = io(BASE_URL);
  const orderSocket = io.connect(`${BASE_URL}/orders/${symbol}`);
  const tradeSocket = io.connect(`${BASE_URL}/orders/${symbol}`);
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve({ orderSocket, tradeSocket });
    });
  });
}

function* read(socket) {

}

function* write(socket) {
  
}

function* handleIO(socket) {
  yield fork(read, socket);
  yield fork(write, socket);
}

function* flow() {
  const symbol = yield select(getCurrentSymbol);
  const sockets = yield call(connect, symbol);

  const orderTask = yield fork(handleIO, sockets.orderSocket);
  const tradeTask = yield fork(handleIO, sockets.tradeSocket);
}
