export const isServer = typeof window === 'undefined';
export const isProd = process.env.NODE_ENV === 'production';

export const DEFAULT_WALLET_ADDRESS = 'hx86602516fd2a54643d369d1e38e799b54e2b2577';
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
  version: '0x3',
  nid: isProd ? '0x1' : '0x3',
  stepLimit: '0x100000000',
  dataType: 'call',
};
