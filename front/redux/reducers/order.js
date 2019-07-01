import produce from 'immer';
import { findId } from './iconex';
import actionTypes from '../actionTypes';

export const initialState = {
  sellingOrders: [],
  buyingOrders: [],
  jsonRpcIds: {},
  myOrderBook: null,
};

export default (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case actionTypes.LOAD_BUY_ORDER_REQUEST: {
        const id = findId(draft, actionTypes.LOAD_BUY_ORDER_REQUEST_ID);
        delete draft.jsonRpcIds[id];
        draft.jsonRpcIds[action.id] = actionTypes.LOAD_BUY_ORDER_REQUEST_ID;
        break;
      }
      case actionTypes.LOAD_SELL_ORDER_REQUEST: {
        const id = findId(draft, actionTypes.LOAD_SELL_ORDER_REQUEST_ID);
        delete draft.jsonRpcIds[id];
        draft.jsonRpcIds[action.id] = actionTypes.LOAD_SELL_ORDER_REQUEST_ID;
        break;
      }
      case actionTypes.LOAD_BUY_ORDER_SUCCESS: {
        delete draft.jsonRpcIds[action.id];
        const targetOrders =
          action.orders &&
          action.orders
            .filter(
              o =>
                o.token_get === action.address &&
                Number(o.order_fill) < Number(o.get_amount)
            )
            .sort(
              (o1, o2) =>
                o1.give_amount / o1.get_amount - o2.give_amount / o2.get_amount
            );
        draft.buyingOrders = targetOrders;
        break;
      }
      case actionTypes.LOAD_SELL_ORDER_SUCCESS: {
        delete draft.jsonRpcIds[action.id];
        const targetOrders =
          action.orders &&
          action.orders
            .filter(
              o =>
                o.token_give === action.address &&
                Number(o.order_fill) < Number(o.get_amount)
            )
            .sort(
              (o1, o2) =>
                o2.get_amount / o2.give_amount - o1.get_amount / o1.give_amount
            );
        draft.sellingOrders = targetOrders;
        break;
      }
      case actionTypes.BUY_ORDER_REQUEST: {
        const id = findId(draft, actionTypes.BUY_ORDER_REQUEST_ID);
        delete draft.jsonRpcIds[id];
        draft.jsonRpcIds[action.id] = actionTypes.BUY_ORDER_REQUEST_ID;
        break;
      }
      case actionTypes.SELL_ORDER_REQUEST: {
        const id = findId(draft, actionTypes.SELL_ORDER_REQUEST_ID);
        delete draft.jsonRpcIds[id];
        draft.jsonRpcIds[action.id] = actionTypes.SELL_ORDER_REQUEST_ID;
        break;
      }
      case actionTypes.TRADE_ORDER_REQUEST: {
        const id = findId(draft, actionTypes.TRADE_ORDER_REQUEST_ID);
        delete draft.jsonRpcIds[id];
        draft.jsonRpcIds[action.id] = actionTypes.TRADE_ORDER_REQUEST_ID;
      }
      default:
        break;
    }
  });
};
