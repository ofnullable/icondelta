import { REDUX_STEP } from './const';

export const changeState = (type, step, state, target, action) => {
  switch (type) {
    case 'ARR':
      return changeArrayState(step, state, target, action);
    case 'OBJ':
      return changeObjectState(step, state, target, action);
  }
};

const changeObjectState = (step, state, target, action) => {
  switch (step) {
    case REDUX_STEP.SUCCESS:
      return {
        ...state,
        [target]: {
          ...state[target],
          isProceeding: true,
        },
      };
    case REDUX_STEP.SUCCESS: {
      const { data } = action;
      return {
        ...state,
        [target]: {
          ...state[target],
          data: data || {},
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
    case REDUX_STEP.SUCCESS:
      return {
        ...state,
        [target]: {
          ...state[target],
          isProceeding: true,
        },
      };
    case REDUX_STEP.SUCCESS: {
      const { data } = action;
      return {
        ...state,
        [target]: {
          ...state[target],
          data: data || [],
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
