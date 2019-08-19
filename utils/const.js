export const isServer = typeof window === 'undefined';
export const isProd = process.env.NODE_ENV === 'production';

export const SERVER_BASE_URL = 'https://api.icondelta.ga';
export const ICON_NETWORK_URL = isProd
  ? 'https://wallet.icon.foundation'
  : 'https://bicon.net.solidwallet.io';
export const TRACKER_BASE_URL = isProd
  ? 'https://tracker.icon.foundation'
  : 'https://bicon.tracker.solidwallet.io';

export const ICX_ADDRESS = 'cx0000000000000000000000000000000000000000';

export const SCORE_ADDRESS = isProd
  ? 'cxe014be09624aa681f441a632059245279c7bd554'
  : 'cxfd865d6bbfd2931c053e6b105961cd43a3ad9c22';

const ARRAY_DEFAULT_STATE = {
  data: [],
  error: '',
  isProceeding: false,
};

const OBJECT_DEFAULT_STATE = {
  data: {},
  error: '',
  isProceeding: false,
};

export const INITIAL_STATE = {
  ARR: ARRAY_DEFAULT_STATE,
  OBJ: OBJECT_DEFAULT_STATE,
};

export const REDUX_STEP = {
  REQUEST: 'request',
  SUCCESS: 'success',
  FAILURE: 'failure',
};

export const TX_DEFAULT_PARAMETER = {
  nid: isProd ? '0x1' : '0x3',
  version: '0x3',
  stepLimit: '0x1000000',
  dataType: 'call',
};

export const ICON_REQUEST_TARGETS = {
  ICX: 'icx',
  DEPOSITED_ICX: 'depositedIcx',
  TOKEN: 'token',
  DEPOSITED_TOKEN: 'depositedToken',
};

export const ICONEX_REQUEST_ID = {
  DEPOSIT_ICX: 5,
  DEPOSIT_TOKEN: 6,
  WITHDRAW_ICX: 7,
  WITHDRAW_TOKEN: 8,
  TRADE: 9,
};
