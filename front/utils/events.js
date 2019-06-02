import {
  generateJsonRpcParam,
  SEND_QUERY,
  SEND_TRANSACTION,
  GET_ICX_BALANCE,
  GET_TOKEN_BALANCE,
} from './jsonrpc';
import { toLoop } from './formatter';
import { ICONDELTA_ADDRESS } from '../reducers/iconex';

export const REQUEST_ADDRESS = 'REQUEST_ADDRESS';
export const REQUEST_JSON_RPC = 'REQUEST_JSON-RPC';

export const iconexEvent = (type, payload) => {
  if (window && window.CustomEvent) {
    return new CustomEvent('ICONEX_RELAY_REQUEST', {
      detail: { type, payload: payload || null },
    });
  }
};

export const getIcxBalanceEvent = (id, address) =>
  iconexEvent(
    REQUEST_JSON_RPC,
    generateJsonRpcParam(id, GET_ICX_BALANCE, { address })
  );

export const getAddress = () => iconexEvent(REQUEST_ADDRESS);

export const getTokenBalanceEvent = (id, address, tokenAddress) =>
  iconexEvent(
    REQUEST_JSON_RPC,
    generateJsonRpcParam(id, SEND_QUERY, {
      from: address,
      to: tokenAddress,
      dataType: 'call',
      data: {
        method: GET_TOKEN_BALANCE,
        params: { _owner: address },
      },
    })
  );

export const getSellOrdetList = (id, address) =>
  iconexEvent(
    REQUEST_JSON_RPC,
    generateJsonRpcParam(id, SEND_QUERY, {
      from: address,
      to: ICONDELTA_ADDRESS,
      dataType: 'call',
      data: {
        method: 'sellOrderList',
      },
    })
  );

export const getBuyOrdetList = (id, address) =>
  iconexEvent(
    REQUEST_JSON_RPC,
    generateJsonRpcParam(id, SEND_QUERY, {
      from: address,
      to: ICONDELTA_ADDRESS,
      dataType: 'call',
      data: {
        method: 'buyOrderList',
      },
    })
  );

export const depositIcxEvent = (id, address, amount) =>
  iconexEvent(
    REQUEST_JSON_RPC,
    generateJsonRpcParam(id, SEND_TRANSACTION, {
      version: '0x3',
      from: address,
      to: ICONDELTA_ADDRESS,
      value: toLoop(amount),
      dataType: 'call',
      data: { method: 'deposit' },
    })
  );

export const withdrawIcxEvent = (id, address, amount) =>
  iconexEvent(
    REQUEST_JSON_RPC,
    generateJsonRpcParam(id, SEND_TRANSACTION, {
      version: '0x3',
      from: address,
      to: ICONDELTA_ADDRESS,
      value: toLoop(amount),
      dataType: 'call',
      data: { method: 'withdraw', params: { _amount: toLoop(amount) } },
    })
  );
