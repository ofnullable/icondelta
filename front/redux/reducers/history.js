import AT from '../actionTypes';
import { changeState, addInfoToOrder } from '../../utils/utils';
import { INITIAL_STATE, REDUX_STEP } from '../../utils/const';
import { toIcx, toBigNumber } from '../../utils/formatter';

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

    case AT.MY_NEW_ORDER_RECEIVED: {
      if (action.data.action === 'update') {
        let target = state.orders.data.find(o => o.signature === action.data.signature);
        target.orderFills += action.data.orderFills;
        target.amount = action.data.amount;

        return {
          ...state,
          orders: {
            ...state.orders,
            data: [...state.orders.data],
          },
        };
      } else {
        return {
          ...state,
          orders: {
            ...state.orders,
            data: [action.data, ...state.orders.data],
          },
        };
      }
    }

    case AT.MY_NEW_TRADE_RECEIVED:
      return {
        ...state,
        trades: {
          ...state.trades,
          data: [action.data, ...state.trades.data],
        },
      };

    default:
      return {
        ...state,
      };
  }
};
