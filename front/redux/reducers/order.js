import AT from '../actionTypes';
import { changeState } from '../../utils/utils';
import { INITIAL_STATE, REDUX_STEP } from '../../utils/const';

const initialState = {
  buyOrders: INITIAL_STATE['ARR'],
  sellOrders: INITIAL_STATE['ARR'],
  savedOrder: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AT.BUY_ORDER_LIST_RECEIVED:
      return changeState('ARR', REDUX_STEP.SUCCESS, state, 'buyOrders', action);
    case AT.SELL_ORDER_LIST_RECEIVED:
      return changeState('ARR', REDUX_STEP.SUCCESS, state, 'sellOrders', action);
    case AT.MAKE_ORDER_REQUEST:
      return {
        ...state,
        ['savedOrder']: action.data,
      };
    default:
      return {
        ...state,
      };
  }
};
