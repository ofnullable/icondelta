import AT from '../actionTypes';
import { changeState, addInfoToOrder } from '../../utils/utils';
import { INITIAL_STATE, REDUX_STEP } from '../../utils/const';

const initialState = {
  trades: INITIAL_STATE['ARR'],
  orders: INITIAL_STATE['ARR'],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AT.LOAD_ORDER_LIST_BY_ADDRESS_REQUEST:
      return changeState('ARR', REDUX_STEP.REQUEST, state, 'orders');

    case AT.LOAD_ORDER_LIST_BY_ADDRESS_SUCCESS:
      action.data = action.data
        ? addInfoToOrder(action.data.data.buy.concat(action.data.data.sell))
        : [];
      return changeState('ARR', REDUX_STEP.SUCCESS, state, 'orders', action);

    case AT.LOAD_ORDER_LIST_BY_ADDRESS_FAILURE:
      return changeState('ARR', REDUX_STEP.FAILURE, state, 'orders', action);

    case AT.LOAD_TRADE_LIST_BY_ADDRESS_REQUEST:
      return changeState('ARR', REDUX_STEP.REQUEST, state, 'trades');

    case AT.LOAD_TRADE_LIST_BY_ADDRESS_SUCCESS:
      action.data = action.data ? action.data.data : [];
      return changeState('ARR', REDUX_STEP.SUCCESS, state, 'trades', action);

    case AT.LOAD_TRADE_LIST_BY_ADDRESS_FAILURE:
      return changeState('ARR', REDUX_STEP.FAILURE, state, 'trades', action);

    case AT.MY_NEW_ORDER_RECEIVED: {
      if (action.data.action === 'update') {
        const index = state.orders.data.findIndex(o => o.signature === action.data.signature);
        state.orders.data[index].orderFills += action.data.orderFills;

        if (action.data.amount === '0') {
          state.orders.data.splice(index, 1);
        } else {
          state.orders.data[index].amount = action.data.amount;
        }

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
