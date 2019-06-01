export const GET_ICX_BALANCE = 'icx_getBalance';
export const GET_TOKEN_BALANCE = 'get_balance';

export const SEND_QUERY = 'icx_call';
export const SEND_TRANSACTION = 'icx_sendTransaction';

export const GET_TRANSACTION_RESULT = 'icx_getTransactionResult';

export const generateJsonRpcId = () => Math.ceil(Math.random() * 9999);
export const generateJsonRpcParam = (id, method, params) => {
  return {
    jsonrpc: '2.0',
    method,
    id, // generateJsonRpcId()
    params: params || null,
  };
};
