export const isServer = typeof window === 'undefined';
export const isProd = process.env.NODE_ENV === 'production';

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
  stepLimit: '0x10000000',
  dataType: 'call',
};

// For event handling.. but not now
export const REQUEST_ID = {
  ICX_BALANCE: 1,
  TOKEN_BALANCE: 2,
  DEPOSITED_ICX_BALANCE: 3,
  DEPOSTIED_TOKEN_BALANCE: 4,
  DEPOSIT_ICX: 5,
  DEPOSIT_TOKEN: 6,
  WITHDRAW_ICX: 7,
  WITHDRAW_TOKEN: 8,
};
