import AT from '../actionTypes';

import { addInfoToOrder } from '../../utils/utils';

const initialState = {
  buyOrders: [],
  sellOrders: [],
  tempOrder: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AT.ORDER_LIST_RECEIVED:
      if (action.data) {
        action.data = action.data.data;
        return {
          ...state,
          buyOrders: addInfoToOrder(action.data.buy).sort((o1, o2) => o2.price - o1.price),
          sellOrders: addInfoToOrder(action.data.sell).sort((o1, o2) => o2.price - o1.price),
        };
      } else {
        return {
          ...state,
          buyOrders: [],
          sellOrders: [],
        };
      }

    case AT.NEW_ORDER_RECEIVED: {
      const orderData = addInfoToOrder(action.data);

      if (orderData.action === 'create') {
        if (orderData.type === 'buy') {
          state.buyOrders = [...state.buyOrders, orderData].sort((o1, o2) => o2.price - o1.price);
        } else {
          state.sellOrders = [...state.sellOrders, orderData].sort((o1, o2) => o2.price - o1.price);
        }
      } else {
        if (orderData.type === 'buy') {
          const index = state.buyOrders.findIndex(o => o.signature === orderData.signature);
          if (orderData.getAmount <= orderData.orderFills) {
            state.buyOrders = state.buyOrders.filter((_, i) => i !== index);
          } else {
            state.buyOrders[index] = { ...orderData };
            state.buyOrders = [...state.buyOrders];
          }
        } else {
          const index = state.sellOrders.findIndex(o => o.signature === orderData.signature);
          if (orderData.getAmount <= orderData.orderFills) {
            state.sellOrders = state.sellOrders.filter((_, i) => i !== index);
          } else {
            state.sellOrders[index] = { ...orderData };
            state.sellOrders = [...state.sellOrders];
          }
        }
      }
      return {
        ...state,
      };
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

    case AT.ORDER_REQUEST:

    default:
      return {
        ...state,
      };
  }
};
