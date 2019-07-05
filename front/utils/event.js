import AT from '../redux/actionTypes';
import { isServer, isProd } from './const';

const nid = isProd ? '0x1' : '0x3';
const version = '0x3';
const stepLimit = '0x550001';

const TX_DEFAULT_PARAMETER = {
  version,
  nid,
  stepLimit,
  dataType: 'call',
};

export const addIconexEventListner = handler =>
  window.addEventListener(AT.ICONEX_RELAY_RESPONSE, handler);

export const removeIconexEventListner = handler =>
  window.removeEventListener(AT.ICONEX_RELAY_RESPONSE, handler);

const iconexEvent = (type, payload) => {
  if (typeof type === 'object' && !payload) {
    // type이 Object고, 두번째 argument가 없는 경우 type을 지정하지 않았다고 가정한다. 지정하지 않은 경우 JSON-RPC 요청.
    payload = type;
    type = 'REQUEST_JSON-RPC';
  }
  console.log('Event payload:', payload);

  if (window && window.CustomEvent) {
    const detail = { type, payload };
    return new CustomEvent('ICONEX_RELAY_REQUEST', { detail });
  }
};

const dispatchEvent = (...events) => {
  events.map(e => {
    if (!e instanceof CustomEvent) throw new Error();
    window.dispatchEvent(e);
  });
  return [...events];
};

export const makeEventId = () => {
  if (window && window.crypto && window.crypto.getRandomValues && Uint32Array) {
    var o = new Uint32Array(1);
    window.crypto.getRandomValues(o);
    return o[0];
  } else {
    console.warn('Falling back to pseudo-random client seed');
    return Math.floor(Math.random() * Math.pow(2, 32));
  }
};

export const requestAddress = () =>
  !isServer && dispatchEvent(iconexEvent('REQUEST_ADDRESS'));
