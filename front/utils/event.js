import AT from '../redux/actionTypes';
import { SCORE_ADDRESS, TX_DEFAULT_PARAMETER } from './const';
import { toLoop } from './formatter';

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
  // console.log(`Event handler - type:, ${type}, payload:`, payload);
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
  // console.log(`Event payload - type:, ${type}, payload:`, payload);
  if (window && window.CustomEvent) {
    const detail = { type, payload };
    return new CustomEvent('ICONEX_RELAY_REQUEST', { detail });
  }
};

const dispatchEvents = (...events) => {
  events.forEach(e => {
    if (!e instanceof CustomEvent) throw new Error('Can not dispatch event for ' + e.toString());
    window.dispatchEvent(e);
  });
};

const makeEventId = () => {
  if (window && window.crypto && window.crypto.getRandomValues && Uint32Array) {
    var o = new Uint32Array(1);
    window.crypto.getRandomValues(o);
    return o[0];
  } else {
    console.warn('Falling back to pseudo-random client seed');
    return Math.floor(Math.random() * Math.pow(2, 32));
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

const loadIcxBalance = (id, address) =>
  iconexEvent(makeEventPayload({ id, method: GET_ICX_BALANCE, params: { address } }));

const loadDepositedIcxBalance = (id, address) =>
  iconexEvent(
    makeEventPayload({
      id,
      method: SEND_QUERY,
      params: {
        from: address,
        to: SCORE_ADDRESS,
        dataType: 'call',
        data: {
          method: BALANCE_OF,
          params: { _address: address },
        },
      },
    })
  );

const loadTokenBalance = (id, address, tokenAddress) =>
  iconexEvent(
    makeEventPayload({
      id,
      method: SEND_QUERY,
      params: {
        from: address,
        to: tokenAddress,
        dataType: 'call',
        data: {
          method: BALANCE_OF,
          params: { _owner: address },
        },
      },
    })
  );

const loadDepositedTokenBalance = (id, address, tokenAddress) =>
  iconexEvent(
    makeEventPayload({
      id,
      method: SEND_QUERY,
      params: {
        from: address,
        to: SCORE_ADDRESS,
        dataType: 'call',
        data: {
          method: TOKEN_BALANCE_OF,
          params: { _tokenAddress: tokenAddress, _address: address },
        },
      },
    })
  );

const makeDepositIcxEvent = (amount, address) =>
  iconexEvent(
    makeEventPayload({
      id: makeEventId(),
      method: SEND_TRANSACTION,
      params: {
        ...TX_DEFAULT_PARAMETER,
        from: address,
        to: SCORE_ADDRESS,
        value: toLoop(amount),
        timestamp: `0x${(new Date().getTime() * 1000).toString(16)}`,
        data: { method: 'deposit' },
      },
    })
  );

const makeWithdrawIcxEvent = (amount, address) =>
  iconexEvent(
    makeEventPayload({
      id: makeEventId(),
      method: SEND_TRANSACTION,
      params: {
        ...TX_DEFAULT_PARAMETER,
        from: address,
        to: SCORE_ADDRESS,
        timestamp: `0x${(new Date().getTime() * 1000).toString(16)}`,
        data: { method: 'withdraw', params: { _amount: toLoop(amount) } },
      },
    })
  );

const makeDepostiTokenEvent = (amount, address, tokenAddress) =>
  iconexEvent(
    makeEventPayload({
      id: makeEventId(),
      method: SEND_TRANSACTION,
      params: {
        ...TX_DEFAULT_PARAMETER,
        from: address,
        to: tokenAddress,
        timestamp: `0x${(new Date().getTime() * 1000).toString(16)}`,
        data: { method: 'transfer', params: { _to: SCORE_ADDRESS, _amount: toLoop(amount) } },
      },
    })
  );

const makeWithdrawTokenEvent = (amount, address, tokenAddress) =>
  iconexEvent(
    makeEventPayload({
      id: makeEventId(),
      method: SEND_TRANSACTION,
      params: {
        ...TX_DEFAULT_PARAMETER,
        from: address,
        to: SCORE_ADDRESS,
        timestamp: `0x${(new Date().getTime() * 1000).toString(16)}`,
        data: {
          method: 'withdrawToken',
          params: { _tokenAddress: tokenAddress, _amount: toLoop(amount) },
        },
      },
    })
  );

export const requestAddress = () => dispatchEvents(iconexEvent('REQUEST_ADDRESS'));

export const loadBalances = (address, tokenAddress) => {
  const ids = {
    [AT.ICX_BALANCE_REQUEST_ID]: makeEventId(),
    [AT.DEPOSITED_ICX_BALANCE_REQUEST_ID]: makeEventId(),
    [AT.TOKEN_BALANCE_REQUEST_ID]: makeEventId(),
    [AT.DEPOSITED_TOKEN_BALANCE_REQUEST_ID]: makeEventId(),
  };

  dispatchEvents(
    loadIcxBalance(ids[AT.ICX_BALANCE_REQUEST_ID], address),
    loadDepositedIcxBalance(ids[AT.DEPOSITED_ICX_BALANCE_REQUEST_ID], address),
    loadTokenBalance(ids[AT.TOKEN_BALANCE_REQUEST_ID], address, tokenAddress),
    loadDepositedTokenBalance(ids[AT.DEPOSITED_TOKEN_BALANCE_REQUEST_ID], address, tokenAddress)
  );
  return ids;
};

export const depositIcxEvent = (amount, address) => {
  dispatchEvents(makeDepositIcxEvent(amount, address));
};

export const withdrawIcxEvent = (amount, address) => {
  dispatchEvents(makeWithdrawIcxEvent(amount, address));
};

export const depositTokenEvent = (amount, address, tokenAddress) => {
  dispatchEvents(makeDepostiTokenEvent(amount, address, tokenAddress));
};

export const withdrawTokenEvent = (amount, address, tokenAddress) => {
  dispatchEvents(makeWithdrawTokenEvent(amount, address, tokenAddress));
};
