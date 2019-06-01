export const REQUEST_ADDRESS = 'REQUEST_ADDRESS';
export const REQUEST_JSON_RPC = 'REQUEST_JSON-RPC';

export const getIcxBalanceEvent = id =>
  iconexEvent(
    id,
    REQUEST_JSON_RPC,
    generateJsonRpcParam(GET_ICX_BALANCE, { address: payload })
  );

export const getTokenBalanceEvent = id =>
  iconexEvent(SEND_QUERY, {
    id,
    from: payload,
    to: tokenAddress,
    dataType: 'call',
    data: {
      method: 'get_balance',
      params: { address: payload },
    },
  });

export const iconexEvent = (type, payload) => {
  if (window && window.CustomEvent) {
    return new CustomEvent('ICONEX_RELAY_REQUEST', {
      detail: { type, payload: payload || null },
    });
  }
};
