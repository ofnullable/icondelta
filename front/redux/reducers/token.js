import AT from '../actionTypes';
import { INITIAL_STATE } from '../../utils/const';

const initialState = {
  tokenList: INITIAL_STATE['ARR'],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AT.LOAD_TOKEN_LIST_REQUEST:
      return changeState('ARR', REDUX_STEP.REQUEST, state, 'tokenList');
    default:
      return {
        ...state,
      };
  }
};
