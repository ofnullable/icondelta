import AT from '../actionTypes';

import { addInfoToOrder } from '../../utils/utils';
import { INITIAL_STATE } from '../../utils/const';

const initialState = {
  buyOrders: INITIAL_STATE['ARR'],
  sellOrders: INITIAL_STATE['ARR'],
  tempOrder: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AT.LOAD_ORDER_LIST_REQUEST:
      return {
        ...state,
        buyOrders: {
          ...state.buyOrders,
          isProceeding: true,
        },
        sellOrders: {
          ...state.sellOrders,
          isProceeding: true,
        },
      };
    case AT.LOAD_ORDER_LIST_SUCCESS:
      action.data = action.data ? action.data.data : [];
      return {
        ...state,
        buyOrders: {
          ...state.buyOrders,
          isProceeding: false,
          data: addInfoToOrder(action.data.buy).sort((o1, o2) => o2.price - o1.price) || [],
        },
        sellOrders: {
          ...state.sellOrders,
          isProceeding: false,
          data: addInfoToOrder(action.data.sell).sort((o1, o2) => o2.price - o1.price) || [],
        },
      };
    case AT.LOAD_ORDER_LIST_FAILURE:
      return {
        ...state,
        buyOrders: {
          ...state.buyOrders,
          isProceeding: false,
          error: action.error,
        },
        sellOrders: {
          ...state.sellOrders,
          isProceeding: false,
          error: action.error,
        },
      };

    case AT.NEW_ORDER_RECEIVED: {
      const orderData = addInfoToOrder(action.data);

      if (orderData.action === 'create') {
        return {
          ...state,
          [`${orderData.type}Orders`]: {
            ...state[`${orderData.type}Orders`],
            data: [...state[`${orderData.type}Orders`].data, orderData].sort(
              (o1, o2) => o2.price - o1.price
            ),
          },
        };
      } else {
        if (orderData.type === 'buy') {
          const index = state.buyOrders.data.findIndex(o => o.signature === orderData.signature);
          if (orderData.getAmount <= orderData.orderFills) {
            state.buyOrders.data = state.buyOrders.data.filter((_, i) => i !== index);
          } else {
            state.buyOrders.data[index] = { ...orderData };
            state.buyOrders.data = [...state.buyOrders.data];
          }
          return {
            ...state,
            buyOrders: {
              ...state.buyOrders,
            },
          };
        } else {
          const index = state.sellOrders.data.findIndex(o => o.signature === orderData.signature);
          if (orderData.getAmount <= orderData.orderFills) {
            state.sellOrders.data = state.sellOrders.data.filter((_, i) => i !== index);
          } else {
            state.sellOrders.data[index] = { ...orderData };
            state.sellOrders.data = [...state.sellOrders.data];
          }
          return {
            ...state,
            sellOrders: {
              ...state.sellOrders,
            },
          };
        }
      }
    }

    case AT.SAVE_TEMPORAL_ORDER:
      return {
        ...state,
        tempOrder: action.data,
      };

    case AT.REMOVE_TEMPORAL_ORDER:
      delete state.tempOrder;
      return {
        ...state,
      };

    default:
      return {
        ...state,
      };
  }
};
