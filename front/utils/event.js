import AT from '../redux/actionTypes';
import { SCORE_ADDRESS, TX_DEFAULT_PARAMETER, REQUEST_ID } from './const';
import { toHexLoop, toHexString } from './formatter';
import { makeRandomNumber } from './utils';

// event payload - { method }
const SEND_QUERY = 'icx_call';
const GET_ICX_BALANCE = 'icx_getBalance';
const SEND_TRANSACTION = 'icx_sendTransaction';

// event payload - { params: { data: method } }
const BALANCE_OF = 'balanceOf';
const TOKEN_BALANCE_OF = 'tokenBalanceOf';

export const addIconexEventListner = handler =>
  window.addEventListener(AT.ICONEX_RELAY_RESPONSE, handler);

export const removeIconexEventListner = handler =>
  window.removeEventListener(AT.ICONEX_RELAY_RESPONSE, handler);

export const eventHandler = dispatch => e => {
  const { type, payload } = e.detail;
  dispatch({
    type,
    payload,
  });
};

const iconexEvent = (type, payload) => {
  if (typeof type === 'object' && !payload) {
    payload = type;
    type = 'REQUEST_JSON-RPC';
  }
  console.log(`Event payload - type:, ${type}, payload:`, payload);
  if (window && window.CustomEvent) {
    const detail = { type, payload };
    return new CustomEvent('ICONEX_RELAY_REQUEST', { detail });
  }
};

const makeEventPayload = ({ id, method, params = {} }) => {
  return {
    id,
    method,
    params,
    jsonrpc: '2.0',
  };
};

const makeSignatureEvent = (address, txHash) =>
  iconexEvent('REQUEST_SIGNING', { from: address, hash: txHash });

const makeDepositIcxEvent = (amount, address) =>
  iconexEvent(
    makeEventPayload({
      id: makeRandomNumber(),
      method: SEND_TRANSACTION,
      params: {
        ...TX_DEFAULT_PARAMETER,
        from: address,
        to: SCORE_ADDRESS,
        value: toHexLoop(amount),
        timestamp: `0x${(new Date().getTime() * 1000).toString(16)}`,
        data: { method: 'deposit', params: {} },
      },
    })
  );

const makeWithdrawIcxEvent = (amount, address) =>
  iconexEvent(
    makeEventPayload({
      id: makeRandomNumber(),
      method: SEND_TRANSACTION,
      params: {
        ...TX_DEFAULT_PARAMETER,
        from: address,
        to: SCORE_ADDRESS,
        timestamp: `0x${(new Date().getTime() * 1000).toString(16)}`,
        data: { method: 'withdraw', params: { _amount: toHexLoop(amount) } },
      },
    })
  );

const makeDepostiTokenEvent = (amount, address, tokenAddress) =>
  iconexEvent(
    makeEventPayload({
      id: makeRandomNumber(),
      method: SEND_TRANSACTION,
      params: {
        ...TX_DEFAULT_PARAMETER,
        from: address,
        to: tokenAddress,
        timestamp: `0x${(new Date().getTime() * 1000).toString(16)}`,
        data: { method: 'transfer', params: { _to: SCORE_ADDRESS, _amount: toHexLoop(amount) } },
      },
    })
  );

const makeWithdrawTokenEvent = (amount, address, tokenAddress) =>
  iconexEvent(
    makeEventPayload({
      id: makeRandomNumber(),
      method: SEND_TRANSACTION,
      params: {
        ...TX_DEFAULT_PARAMETER,
        from: address,
        to: SCORE_ADDRESS,
        timestamp: `0x${(new Date().getTime() * 1000).toString(16)}`,
        data: {
          method: 'withdrawToken',
          params: { _tokenAddress: tokenAddress, _amount: toHexLoop(amount) },
        },
      },
    })
  );

const makeTradeEvent = (order, taker) =>
  iconexEvent(
    makeEventPayload({
      id: REQUEST_ID.TRADE,
      method: SEND_TRANSACTION,
      params: {
        ...TX_DEFAULT_PARAMETER,
        from: taker.address,
        to: SCORE_ADDRESS,
        timestamp: `0x${(new Date().getTime() * 1000).toString(16)}`,
        data: {
          method: 'trade',
          params: {
            _tokenGet: order.tokenGet,
            _getAmount: toHexString(order.getAmount),
            _tokenGive: order.tokenGive,
            _giveAmount: toHexString(order.giveAmount),
            _orderMaker: order.makerAddress,
            _nonce: toHexString(order.nonce),
            _signature: order.signature,
            _takerOrderAmount: toHexLoop(taker.amount),
          },
        },
      },
    })
  );

export const requestAddress = () => window.dispatchEvent(iconexEvent('REQUEST_ADDRESS'));

export const requestSignatureEvent = (address, txHash) =>
  window.dispatchEvent(makeSignatureEvent(address, txHash));

export const depositIcxEvent = (amount, address) =>
  window.dispatchEvent(makeDepositIcxEvent(amount, address));

export const withdrawIcxEvent = (amount, address) =>
  window.dispatchEvent(makeWithdrawIcxEvent(amount, address));

export const depositTokenEvent = (amount, address, tokenAddress) =>
  window.dispatchEvent(makeDepostiTokenEvent(amount, address, tokenAddress));

export const withdrawTokenEvent = (amount, address, tokenAddress) =>
  window.dispatchEvent(makeWithdrawTokenEvent(amount, address, tokenAddress));

export const requestTradeEvent = (order, taker) =>
  window.dispatchEvent(makeTradeEvent(order, taker));
