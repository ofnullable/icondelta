import AT from '../actionTypes';
import { changeState, addInfoToOrder } from '../../utils/utils';
import { INITIAL_STATE, REDUX_STEP } from '../../utils/const';

const initialState = {
  trades: INITIAL_STATE['ARR'],
  orders: INITIAL_STATE['ARR'],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AT.MY_ORDER_LIST_RECEIVED:
      action.data = addInfoToOrder(action.data.buy.concat(action.data.sell));
      return changeState('ARR', REDUX_STEP.SUCCESS, state, 'orders', action);

    case AT.MY_TRADE_LIST_RECEIVED:
      return changeState('ARR', REDUX_STEP.SUCCESS, state, 'trades', action);

    default:
      return {
        ...state,
      };
  }
};
