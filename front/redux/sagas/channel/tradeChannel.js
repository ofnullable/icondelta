import { eventChannel } from 'redux-saga';
import { fork, take, takeLatest, call, put, cancel, select } from 'redux-saga/effects';

import AT from '../../actionTypes';
import { setTokenPrice } from '../../actions/tokenActions';
import { loadWalletBalance } from '../../actions/walletActions';
import { myNewTradeReceived } from '../../actions/historyAction';

const getAddress = state => state.wallet.address;
const getCurrentToken = state => state.token.currentToken;

let task;

function subscribeTrade({ socket, address, token }) {
  return eventChannel(emit => {
    socket.on('trade_event', res => {
      console.log('broadcasted trade', res);
      emit(setTokenPrice(res));
      if (
        res.tokenAddress === token.address &&
        (res.takerAddress === address || res.makerAddress === address)
      ) {
        emit(myNewTradeReceived(res));
      }
      emit(loadWalletBalance({ address: address, symbol: token.symbol }));
    });
    socket.on('trade:checkTradeTxHash', res => {
      console.log('trade:checkTradeTxHash', res);
    });
    return () => {};
  });
}

function* readTrade(socket) {
  const address = yield select(getAddress);
  const currentToken = yield select(getCurrentToken);
  const channel = yield call(subscribeTrade, { socket, address, token: currentToken });

  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

function* sendTxHash({ data }) {
  const sid = data.socket.io.engine.id;
  data.socket.emit('trade_event', {
    event: 'checkTradeTxHash',
    params: { sid, txHash: data.txHash },
  });
}

function* checkTrade() {
  yield takeLatest(AT.CHECK_TRADE_REQUEST, sendTxHash);
}

function* handleTradeEvent(socket) {
  yield fork(checkTrade);
  yield fork(readTrade, socket);
}

function* flow({ data }) {
  const { trade } = data;
  console.log('trade socket:', trade);
  const tradeTask = yield fork(handleTradeEvent, trade);
  task = tradeTask;
}

function* cancelTask() {
  yield cancel(task);
}

export default function*() {
  yield takeLatest(AT.SET_SOCKET, flow);
  yield takeLatest(AT.REMOVE_SOCKET, cancelTask);
}
