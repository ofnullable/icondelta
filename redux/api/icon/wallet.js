import { iconApiInstance } from '../config';
import { SCORE_ADDRESS, ICON_REQUEST_TARGETS } from '../../../utils/const';

const getIcxParam = address => {
  return {
    id: 1564768117719,
    jsonrpc: '2.0',
    method: 'icx_getBalance',
    params: {
      address,
    },
  };
};

const getDepositedIcxParam = address => {
  return {
    id: 1565044617206,
    jsonrpc: '2.0',
    method: 'icx_call',
    params: {
      to: SCORE_ADDRESS,
      dataType: 'call',
      data: {
        method: 'balanceOf',
        params: {
          _address: address,
        },
      },
    },
  };
};

const getTokenParam = (address, tokenAddress) => {
  return {
    id: 1565044617330,
    jsonrpc: '2.0',
    method: 'icx_call',
    params: {
      to: tokenAddress,
      dataType: 'call',
      data: {
        method: 'balanceOf',
        params: { _owner: address },
      },
    },
  };
};

const getDepositedTokenParam = (address, tokenAddress) => {
  return {
    id: 1565044617330,
    jsonrpc: '2.0',
    method: 'icx_call',
    params: {
      dataType: 'call',
      to: SCORE_ADDRESS,
      data: {
        method: 'tokenBalanceOf',
        params: {
          _address: address,
          _tokenAddress: tokenAddress,
        },
      },
    },
  };
};

const getRequestParam = (target, address, tokenAddress) => {
  switch (target) {
    case ICON_REQUEST_TARGETS.ICX:
      return JSON.stringify(getIcxParam(address));
    case ICON_REQUEST_TARGETS.DEPOSITED_ICX:
      return JSON.stringify(getDepositedIcxParam(address));
    case ICON_REQUEST_TARGETS.TOKEN:
      return JSON.stringify(getTokenParam(address, tokenAddress));
    case ICON_REQUEST_TARGETS.DEPOSITED_TOKEN:
      return JSON.stringify(getDepositedTokenParam(address, tokenAddress));
    default:
      return '';
  }
};

const loadIcxApi = address => {
  return new Promise((resolve, reject) => {
    iconApiInstance()
      .post('/v3', getRequestParam(ICON_REQUEST_TARGETS.ICX, address))
      .then(r => {
        resolve(r.data.result);
      })
      .catch(e => reject(e));
  });
};
const loadDepositedIcxApi = address => {
  return new Promise((resolve, reject) => {
    iconApiInstance()
      .post('/v3', getRequestParam(ICON_REQUEST_TARGETS.DEPOSITED_ICX, address))
      .then(r => {
        resolve(r.data.result);
      })
      .catch(e => reject(e));
  });
};
const loadTokenApi = (address, tokenAddress) => {
  return new Promise((resolve, reject) => {
    iconApiInstance()
      .post('/v3', getRequestParam(ICON_REQUEST_TARGETS.TOKEN, address, tokenAddress))
      .then(r => {
        resolve(r.data.result);
      })
      .catch(e => reject(e));
  });
};
const loadDepositedTokenApi = (address, tokenAddress) => {
  return new Promise((resolve, reject) => {
    iconApiInstance()
      .post('/v3', getRequestParam(ICON_REQUEST_TARGETS.DEPOSITED_TOKEN, address, tokenAddress))
      .then(r => {
        resolve(r.data.result);
      })
      .catch(e => reject(e));
  });
};

export const loadIcxBalance = async address => {
  return {
    undeposited: await loadIcxApi(address),
    deposited: await loadDepositedIcxApi(address),
  };
};

export const loadTokenBalance = async (address, tokenAddress) => {
  return {
    undeposited: await loadTokenApi(address, tokenAddress),
    deposited: await loadDepositedTokenApi(address, tokenAddress),
  };
};
