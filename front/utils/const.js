export const isServer = typeof window === 'undefined';
export const isProd = process.env.NODE_ENV === 'production';

export const DEFAULT_WALLET_ADDRESS =
  'hx86602516fd2a54643d369d1e38e799b54e2b2577';
export const SCORE_ADDRESS = isProd
  ? 'cxe014be09624aa681f441a632059245279c7bd554'
  : 'cxfd865d6bbfd2931c053e6b105961cd43a3ad9c22';

export const INITIAL_STATE = {
  ARR: INITIAL_ARRAY_STATE,
  OBJ: INITIAL_OBJECT_STATE,
};

const INITIAL_ARRAY_STATE = {
  data: [],
  error: '',
  isProceeding: false,
};

const INITIAL_OBJECT_STATE = {
  data: {},
  error: '',
  isProceeding: false,
};

export const REDUX_STEP = {
  REQUEST: 'request',
  SUCCESS: 'success',
  FAILURE: 'failure',
};
