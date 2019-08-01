import AT from '../actionTypes';

import { toIcx, toBigNumber } from '../../utils/formatter';

const initialState = {
  buyOrders: [],
  sellOrders: [],
  savedOrder: null,
};

const calcAmount = order => {
  return order.type === 'sell'
    ? toIcx(order.giveAmount - order.orderFills)
    : toIcx(order.getAmount - order.orderFills);
};

const calcPrice = order => {
  return order.type === 'sell'
    ? order.getAmount / order.giveAmount
    : order.giveAmount / order.getAmount;
};

const calcTotal = order => {
  return order.type === 'sell'
    ? toIcx(order.price * (order.giveAmount - order.orderFills))
    : toIcx(order.price * (order.getAmount - order.orderFills));
};

const addInfo = order => {
  if (order instanceof Array) {
    return order.map(o => {
      o.amount = calcAmount(o);
      o.price = calcPrice(o);
      o.total = calcTotal(o);
      return o;
    });
  } else if (order instanceof Object) {
    order.amount = calcAmount(order);
    order.price = calcPrice(order);
    order.total = calcTotal(order);
    return order;
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AT.BUY_ORDER_LIST_RECEIVED: {
      return {
        ...state,
        ['buyOrders']: addInfo(action.data).sort((o1, o2) => o2.price - o1.price),
      };
    }
    case AT.SELL_ORDER_LIST_RECEIVED: {
      return {
        ...state,
        ['sellOrders']: addInfo(action.data).sort((o1, o2) => o2.price - o1.price),
      };
    }
    case AT.NEW_ORDER_RECEIVED: {
      const orderData = addInfo(action.data);

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
            state.buyOrders = [...buyOrders];
          }
        } else {
          const index = state.sellOrders.findIndex(o => o.signature === orderData.signature);
          if (orderData.giveAmount <= orderData.orderFills) {
            state.sellOrders = state.sellOrders.filter((_, i) => i !== index);
          } else {
            state.sellOrders[index] = { ...orderData };
            state.sellOrders = [...sellOrders];
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
        ['savedOrder']: action.data,
      };
    case AT.REMOVE_TEMPORAL_ORDER:
      delete state['savedOrder'];
      return {
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
};
