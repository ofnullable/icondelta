export const REQUEST_ADDRESS = 'REQUEST_ADDRESS';
export const REQUEST_JSON_RPC = 'REQUEST_JSON-RPC';

export default (type, payload) => {
  if (window && window.CustomEvent) {
    return new CustomEvent('ICONEX_RELAY_REQUEST', {
      detail: { type, payload: payload || null },
    });
  }
};
