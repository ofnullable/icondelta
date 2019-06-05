import {
  generateJsonRpcParam,
  SEND_QUERY,
  SEND_TRANSACTION,
  GET_ICX_BALANCE,
  BALANCE_OF,
  TOKEN_BALANCE_OF,
  generateNonce,
} from './jsonrpc';
import { toLoop } from './formatter';

const isProd = process.env.NODE_ENV === 'production';

const stepLimit = '0x550001';
const version = '0x3';
const nid = isProd ? '0x1' : '0x3'; // '0x1';
const DEFAULT_WALLET_ADDRESS = 'hx86602516fd2a54643d369d1e38e799b54e2b2577';
const ICONDELTA_ADDRESS = isProd
  ? 'cxe014be09624aa681f441a632059245279c7bd554'
  : 'cxfd865d6bbfd2931c053e6b105961cd43a3ad9c22';

const txCallDefault = {
  version,
  stepLimit,
  nid,
  dataType: 'call',
};

export const REQUEST_ADDRESS = 'REQUEST_ADDRESS';
export const REQUEST_JSON_RPC = 'REQUEST_JSON-RPC';

export const iconexEvent = (type, payload) => {
  // console.log('payload', payload);
  if (window && window.CustomEvent) {
    return new CustomEvent('ICONEX_RELAY_REQUEST', {
      detail: { type, payload: payload || null },
    });
  }
};

export const getAddressEvent = () => iconexEvent(REQUEST_ADDRESS);

export const getIcxBalanceEvent = (id, address) =>
  iconexEvent(
    REQUEST_JSON_RPC,
    generateJsonRpcParam(id, GET_ICX_BALANCE, { address })
  );

export const getDepositedIcxBalanceEvent = (id, address) =>
  iconexEvent(
    REQUEST_JSON_RPC,
    generateJsonRpcParam(id, SEND_QUERY, {
      from: address,
      to: ICONDELTA_ADDRESS,
      dataType: 'call',
      data: {
        method: BALANCE_OF,
        params: { _address: address },
      },
    })
  );

export const getTokenBalanceEvent = (id, address, tokenAddress) =>
  iconexEvent(
    REQUEST_JSON_RPC,
    generateJsonRpcParam(id, SEND_QUERY, {
      from: address,
      to: tokenAddress,
      dataType: 'call',
      data: {
        method: BALANCE_OF,
        params: { _owner: address },
      },
    })
  );

export const getDepositedTokenBalanceEvent = (id, address, tokenAddress) =>
  iconexEvent(
    REQUEST_JSON_RPC,
    generateJsonRpcParam(id, SEND_QUERY, {
      from: address,
      to: ICONDELTA_ADDRESS,
      dataType: 'call',
      data: {
        method: TOKEN_BALANCE_OF,
        params: { _tokenAddress: tokenAddress, _address: address },
      },
    })
  );

export const getBuyOrderListEvent = id =>
  iconexEvent(
    REQUEST_JSON_RPC,
    generateJsonRpcParam(id, SEND_QUERY, {
      from: DEFAULT_WALLET_ADDRESS,
      to: ICONDELTA_ADDRESS,
      dataType: 'call',
      data: {
        method: 'buyOrderList',
      },
    })
  );

export const getSellOrderListEvent = id =>
  iconexEvent(
    REQUEST_JSON_RPC,
    generateJsonRpcParam(id, SEND_QUERY, {
      from: DEFAULT_WALLET_ADDRESS,
      to: ICONDELTA_ADDRESS,
      dataType: 'call',
      data: {
        method: 'sellOrderList',
      },
    })
  );

export const depositIcxEvent = (id, address, amount) => {
  return iconexEvent(
    REQUEST_JSON_RPC,
    generateJsonRpcParam(id, SEND_TRANSACTION, {
      ...txCallDefault,
      from: address,
      to: ICONDELTA_ADDRESS,
      value: toLoop(amount),
      timestamp: `0x${(new Date().getTime() * 1000).toString(16)}`,
      data: { method: 'deposit' },
    })
  );
};

export const withdrawIcxEvent = (id, address, amount) =>
  iconexEvent(
    REQUEST_JSON_RPC,
    generateJsonRpcParam(id, SEND_TRANSACTION, {
      ...txCallDefault,
      from: address,
      to: ICONDELTA_ADDRESS,
      timestamp: `0x${(new Date().getTime() * 1000).toString(16)}`,
      data: { method: 'withdraw', params: { _amount: toLoop(amount) } },
    })
  );

export const depositTokenEvent = (id, address, tokenAddress, amount) =>
  iconexEvent(
    REQUEST_JSON_RPC,
    generateJsonRpcParam(id, SEND_TRANSACTION, {
      ...txCallDefault,
      from: address,
      to: tokenAddress,
      timestamp: `0x${(new Date().getTime() * 1000).toString(16)}`,
      data: {
        method: 'transfer',
        params: { _to: ICONDELTA_ADDRESS, _value: toLoop(amount) },
      },
    })
  );

export const withdrawTokenEvent = (id, address, tokenAddress, amount) =>
  iconexEvent(
    REQUEST_JSON_RPC,
    generateJsonRpcParam(id, SEND_TRANSACTION, {
      ...txCallDefault,
      from: address,
      to: ICONDELTA_ADDRESS,
      timestamp: `0x${(new Date().getTime() * 1000).toString(16)}`,
      data: {
        method: 'withdrawToken',
        params: { _tokenAddress: tokenAddress, _amount: toLoop(amount) },
      },
    })
  );

export const sendOrderEvent = (
  id,
  address,
  tokenGet,
  getAmount,
  tokenGive,
  giveAmount
) =>
  iconexEvent(
    REQUEST_JSON_RPC,
    generateJsonRpcParam(id, SEND_TRANSACTION, {
      ...txCallDefault,
      from: address,
      to: ICONDELTA_ADDRESS,
      timestamp: `0x${(new Date().getTime() * 1000).toString(16)}`,
      data: {
        method: 'order',
        params: {
          _tokenGet: tokenGet,
          _getAmount: toLoop(getAmount),
          _tokenGive: tokenGive,
          _giveAmount: toLoop(giveAmount),
          _nonce: generateNonce(),
        },
      },
    })
  );

export const tradeEvent = (id, makerOrder, taker) =>
  iconexEvent(
    REQUEST_JSON_RPC,
    generateJsonRpcParam(id, SEND_TRANSACTION, {
      ...txCallDefault,
      from: taker.address,
      to: ICONDELTA_ADDRESS,
      timestamp: `0x${(new Date().getTime() * 1000).toString(16)}`,
      data: {
        method: 'trade',
        params: {
          _tokenGet: makerOrder.token_get,
          _getAmount: makerOrder.get_amount,
          _tokenGive: makerOrder.token_give,
          _giveAmount: makerOrder.give_amount,
          _nonce: makerOrder.nonce,
          _orderMaker: makerOrder.order_maker,
          _takerOrderAmount: toLoop(taker.amount),
        },
      },
    })
  );
