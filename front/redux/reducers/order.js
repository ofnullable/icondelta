import AT from '../actionTypes';
import { changeState } from '../../utils/utils';
import { INITIAL_STATE, REDUX_STEP } from '../../utils/const';

const initialState = {
  orders: INITIAL_STATE['OBJ'],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AT.LOAD_ORDER_LIST_REQUEST:
      return changeState('ARR', REDUX_STEP.REQUEST, state, 'orders');
    case AT.LOAD_ORDER_LIST_SUCCESS:
      return changeState('ARR', REDUX_STEP.SUCCESS, state, 'orders', action);
    case AT.LOAD_ORDER_LIST_FAILURE:
      return changeState('ARR', REDUX_STEP.FAILURE, state, 'orders', action);
    default:
      return {
        ...state,
      };
  }
};
