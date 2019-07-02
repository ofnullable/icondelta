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
