import { eventChannel } from 'redux-saga';
import { fork, take, takeLatest, call, put, cancel, select } from 'redux-saga/effects';

import AT from '../../actionTypes';
import { setTokenPrice } from '../../actions/tokenActions';
import { loadWalletBalance } from '../../actions/walletActions';
import { myNewTradeReceived } from '../../actions/historyAction';

const getAddress = state => state.wallet.address;
const getCurrentToken = state => state.token.currentToken;

let task;

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

function* readTrade(socket) {
  const address = yield select(getAddress);
  const currentToken = yield select(getCurrentToken);
  const channel = yield call(subscribeTrade, socket, { address, token: currentToken });

  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

function* sendTxHash({ data }) {
  data.socket.emit(
    'trade_event',
    { event: 'checkTradeTxHash', params: { txHash: data.txHash } },
    res => console.log(res)
  );
}

function* checkTrade() {
  yield takeLatest(AT.CHECK_TRADE_REQUEST, sendTxHash);
}

function* handleTradeEvent(socket) {
  yield fork(checkTrade);
  yield fork(readTrade, socket);
}

function* cancelTask() {
  yield cancel(task);
}

function* flow({ data }) {
  const { trade } = data;
  console.log('trade socket:', trade);
  const tradeTask = yield fork(handleTradeEvent, trade);
  task = tradeTask;
  yield takeLatest(AT.REMOVE_SOCKET, cancelTask);
}

export default function*() {
  yield takeLatest(AT.SET_SOCKET, flow);
}
