import { toHexString } from './formatter';

export const GET_ICX_BALANCE = 'icx_getBalance';
export const BALANCE_OF = 'balanceOf';
export const TOKEN_BALANCE_OF = 'tokenBalanceOf';

export const SEND_QUERY = 'icx_call';
export const SEND_TRANSACTION = 'icx_sendTransaction';

export const GET_TRANSACTION_RESULT = 'icx_getTransactionResult';

export const generateJsonRpcId = () => {
  if (window && window.crypto && window.crypto.getRandomValues && Uint32Array) {
    const o = new Uint32Array(1);
    window.crypto.getRandomValues(o);
    return o[0];
  } else {
    return Math.floor(Math.random() * Math.pow(2, 32));
  }
};

export const generateNonce = () => toHexString(Math.ceil(Math.random() * 1000));

export const makeJsonRpcParam = (id, method, params) => {
  return {
    jsonrpc: '2.0',
    id,
    method,
    params: params || null,
  };
};
