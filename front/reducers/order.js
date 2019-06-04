import produce from 'immer';
import { findId } from './iconex';

export const initialState = {
  sellingOrders: [],
  buyingOrders: [],
  jsonRpcIds: {},
  myOrderBook: null,
};

// myOrderBook example
// [
//   {
//     id: 2,
//     userAddress: 'user wallet address',
//     symbol: 'DAI',
//     address: 'token Address',
//     type: 'bid',
//     price: 0.49,
//     amount: 20,
//     total: 0.98,
//     orderedAt: new Date().toLocaleString(),
//   },
// ],

export const LOAD_BUY_ORDER_REQUEST_ID = 'LOAD_BUY_ORDER_REQUEST_ID';
export const LOAD_SELL_ORDER_REQUEST_ID = 'LOAD_SELL_ORDER_REQUEST_ID';
export const BUY_ORDER_REQUEST_ID = 'BUY_ORDER_REQUEST_ID';
export const SELL_ORDER_REQUEST_ID = 'SELL_ORDER_REQUEST_ID';

export const LOAD_BUY_ORDER_REQUEST = 'LOAD_BUY_ORDER_REQUEST';
export const LOAD_BUY_ORDER_SUCCESS = 'LOAD_BUY_ORDER_SUCCESS';

export const LOAD_SELL_ORDER_REQUEST = 'LOAD_SELL_ORDER_REQUEST';
export const LOAD_SELL_ORDER_SUCCESS = 'LOAD_SELL_ORDER_SUCCESS';

export const BUY_ORDER_REQUEST = 'BUY_ORDER_REQUEST';
export const BUY_ORDER_SUCCESS = 'BUY_ORDER_SUCCESS';

export const SELL_ORDER_REQUEST = 'SELL_ORDER_REQUEST';
export const SELL_ORDER_SUCCESS = 'SELL_ORDER_SUCCESS';

export default (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case LOAD_BUY_ORDER_REQUEST: {
        const id = findId(draft, LOAD_BUY_ORDER_REQUEST_ID);
        delete draft.jsonRpcIds[id];
        draft.jsonRpcIds[action.id] = LOAD_BUY_ORDER_REQUEST_ID;
        break;
      }
      case LOAD_SELL_ORDER_REQUEST: {
        const id = findId(draft, LOAD_SELL_ORDER_REQUEST_ID);
        delete draft.jsonRpcIds[id];
        draft.jsonRpcIds[action.id] = LOAD_SELL_ORDER_REQUEST_ID;
        break;
      }
      case LOAD_BUY_ORDER_SUCCESS: {
        delete draft.jsonRpcIds[action.id];
        const targetOrders = action.orders
          .filter(
            o => o.token_get === action.address && o.order_fill < o.get_amount
          )
          .sort(
            (o1, o2) =>
              o2.get_amount / o2.give_amount - o1.get_amount / o1.give_amount
          );
        draft.buyingOrders = targetOrders;
        break;
      }
      case LOAD_SELL_ORDER_SUCCESS: {
        delete draft.jsonRpcIds[action.id];
        const targetOrders = action.orders
          .filter(
            o => o.token_give === action.address && o.order_fill < o.give_amount
          )
          .sort(
            (o1, o2) =>
              o1.give_amount / o1.get_amount - o2.give_amount / o2.get_amount
          );
        draft.sellingOrders = targetOrders;
        break;
      }
      case BUY_ORDER_REQUEST: {
        const id = findId(draft, BUY_ORDER_REQUEST_ID);
        delete draft.jsonRpcIds[id];
        draft.jsonRpcIds[action.id] = BUY_ORDER_REQUEST_ID;
        break;
      }
      case SELL_ORDER_REQUEST: {
        const id = findId(draft, SELL_ORDER_REQUEST_ID);
        delete draft.jsonRpcIds[id];
        draft.jsonRpcIds[action.id] = SELL_ORDER_REQUEST_ID;
        break;
      }
      default:
        break;
    }
  });
};
