import AT from '../actionTypes';

const initialState = {
  buyOrders: [],
  sellOrders: [],
  savedOrder: null,
};

const getPrice = (type, order) => {
  return type === 'sell' ? order.getAmount / order.giveAmount : order.giveAmount / order.getAmount;
};

const getAmount = (type, order) => {
  return type === 'sell'
    ? order.giveAmount - (order.orderFills || 0)
    : order.getAmount - (order.orderFills || 0);
};

const getTotal = order => {
  return order.price * order.amount;
};

const addInfo = orderList => {
  return orderList.map(o => {
    o.amount = getAmount(o.type, o);
    o.price = getPrice(o.type, o);
    o.total = getTotal(o);
    return o;
  });
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
    case AT.NEW_ORDER_RECEIVED:
      const orderData = ({
        type,
        tokenGet,
        getAmount,
        tokenGive,
        giveAmount,
        makerAddress,
        nonce,
        signature,
        orderFills,
        orderData,
        amount,
        price,
        total,
      } = addInfo(action.data));

      console.log(orderData);

      if (action.data.action === 'create') {
        if (action.data.type === 'buy') {
          state.buyOrders.push(orderData);
        } else {
          state.sellOrders.data.push(orderData);
        }
      } else {
        if (action.data.type === 'buy') {
          const buyOrders = state.buyOrders;
          const index = buyOrders.findIndex(o => o.signature === action.data.signature);
          buyOrders[index] = { ...orderData };
        } else {
          const sellOrders = state.sellOrders.data;
          const index = sellOrders.findIndex(o => o.signature === action.data.signature);
          buyOrders[index] = { ...orderData };
        }
      }
      return {
        ...state,
      };
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
