import AT from '../actionTypes';
import { changeState } from '../../utils/utils';
import { INITIAL_STATE, REDUX_STEP } from '../../utils/const';

const initialState = {
  trades: INITIAL_STATE['ARR'],
  orders: INITIAL_STATE['ARR'],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AT.MY_BUY_ORDER_LIST_RECEIVED:

    case AT.MY_SELL_ORDER_LIST_RECEIVED:

    case AT.MY_TRADE_LIST_RECEIVED:
      return changeState('ARR', REDUX_STEP.SUCCESS, state, 'trades', action);
    default:
      return {
        ...state,
      };
  }
};
