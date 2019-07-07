import AT from '../actionTypes';
import { changeState } from '../../utils/utils';
import { INITIAL_STATE, REDUX_STEP } from '../../utils/const';

const initialState = {
  currentToken: INITIAL_STATE['OBJ'],
  tokenList: INITIAL_STATE['ARR'],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AT.LOAD_TOKEN_LIST_REQUEST:
      return changeState('ARR', REDUX_STEP.REQUEST, state, 'tokenList');
    case AT.LOAD_TOKEN_LIST_SUCCESS:
      return changeState('ARR', REDUX_STEP.SUCCESS, state, 'tokenList', action);
    case AT.CHANGE_TOKEN:
      return changeState(
        'OBJ',
        REDUX_STEP.SUCCESS,
        state,
        'currentToken',
        action.data
      );
    default:
      return {
        ...state,
      };
  }
};
