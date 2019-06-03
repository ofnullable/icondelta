export const GET_ICX_BALANCE = 'icx_getBalance';
export const BALANCE_OF = 'balanceOf';
export const TOKEN_BALANCE_OF = 'tokenBalanceOf';

export const SEND_QUERY = 'icx_call';
export const SEND_TRANSACTION = 'icx_sendTransaction';

export const GET_TRANSACTION_RESULT = 'icx_getTransactionResult';

export const generateJsonRpcId = () => Math.ceil(Math.random() * 9999);
export const generateJsonRpcParam = (id, method, params) => {
  return {
    jsonrpc: '2.0',
    id,
    method,
    params: params || null,
  };
};
