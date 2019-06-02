import {
  GET_ICX_BALANCE,
  GET_TOKEN_BALANCE,
  SEND_QUERY,
  generateJsonRpcParam,
  SEND_TRANSACTION,
} from './jsonrpc';
import { toLoop } from './formatter';

export const REQUEST_ADDRESS = 'REQUEST_ADDRESS';
export const REQUEST_JSON_RPC = 'REQUEST_JSON-RPC';

export const iconexEvent = (type, payload) => {
  if (window && window.CustomEvent) {
    return new CustomEvent('ICONEX_RELAY_REQUEST', {
      detail: { type, payload: payload || null },
    });
  }
};

export const getIcxBalanceEvent = (id, address) => {
  return iconexEvent(
    REQUEST_JSON_RPC,
    generateJsonRpcParam(id, GET_ICX_BALANCE, { address })
  );
};

export const getTokenBalanceEvent = (id, address, tokenAddress) =>
  iconexEvent(
    REQUEST_JSON_RPC,
    generateJsonRpcParam(id, SEND_QUERY, {
      from: address,
      to: tokenAddress,
      dataType: 'call',
      data: {
        method: GET_TOKEN_BALANCE,
        params: { address },
      },
    })
  );

export const depositIcxEvent = (id, address, amount) => {
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
};
