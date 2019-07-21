import { REDUX_STEP } from './const';

const changeObjectState = (step, state, target, action) => {
  switch (step) {
    case REDUX_STEP.REQUEST:
      return {
        ...state,
        [target]: {
          ...state[target],
          isProceeding: true,
        },
      };
    case REDUX_STEP.SUCCESS: {
      return {
        ...state,
        [target]: {
          ...state[target],
          data: action.data || {},
          isProceeding: false,
        },
      };
    }
    case REDUX_STEP.FAILURE: {
      const { error } = action;
      return {
        ...state,
        [target]: {
          ...state[target],
          isProceeding: false,
          error,
        },
      };
    }
    default:
      return state;
  }
};

const changeArrayState = (step, state, target, action) => {
  switch (step) {
    case REDUX_STEP.REQUEST:
      return {
        ...state,
        [target]: {
          ...state[target],
          isProceeding: true,
        },
      };
    case REDUX_STEP.SUCCESS: {
      return {
        ...state,
        [target]: {
          ...state[target],
          data: action.data || [],
          isProceeding: false,
        },
      };
    }
    case REDUX_STEP.FAILURE: {
      const { error } = action;
      return {
        ...state,
        [target]: {
          ...state[target],
          isProceeding: false,
          error,
        },
      };
    }
    default:
      return state;
  }
};

export const changeState = (type, step, state, target, action) => {
  switch (type) {
    case 'ARR':
      return changeArrayState(step, state, target, action);
    case 'OBJ':
      return changeObjectState(step, state, target, action);
  }
};

export const reverseObject = obj => {
  const result = {};
  Object.keys(obj).forEach(k => (result[obj[k]] = k));
  return result;
};

export const makeSignature = () => {
  // TODO: make signature with sha3-256
};
