import AT from '../actionTypes';
import { changeState } from '../../utils/utils';
import { INITIAL_STATE, REDUX_STEP } from '../../utils/const';

const initialState = {
  currentToken: {},
  tokens: INITIAL_STATE['ARR'],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AT.LOAD_TOKEN_LIST_REQUEST:
      return changeState('ARR', REDUX_STEP.REQUEST, state, 'tokens');

    case AT.LOAD_TOKEN_LIST_SUCCESS:
      return changeState('ARR', REDUX_STEP.SUCCESS, state, 'tokens', action);

    case AT.LOAD_TOKEN_LIST_FAILURE:
      return changeState('ARR', REDUX_STEP.FAILURE, state, 'tokens', action);

    case AT.SET_CURRENT_TOKEN:
      return {
        ...state,
        currentToken: {
          ...action.data,
        },
      };

    case AT.SET_CURRENT_TOKEN_SYMBOL:
      return {
        ...state,
        currentToken: {
          symbol: action.symbol,
        },
      };

    case AT.SET_TOKEN_PRICE:
      const target = state.tokens.data.find(t => t.address === action.data.tokenAddress);
      target.currentPrice = action.data.icxPrice;
      return {
        ...state,
        tokens: {
          ...state.tokens,
          data: [...state.tokens.data],
        },
      };

    case AT.LOAD_LAST_TRADE_BY_TOKEN_REQUEST:
      return {
        ...state,
        tokens: {
          ...state.tokens,
          data: state.tokens.data.map(t => {
            t.currentPrice = 'loading';
            return t;
          }),
        },
      };

    case AT.LOAD_LAST_TRADE_BY_TOKEN_SUCCESS:
      state.tokens.data.forEach(t => {
        if (action.data.data[t.symbol]) {
          t.currentPrice = action.data.data[t.symbol].icxPrice || '-';
        } else {
          t.currentPrice = '';
        }
      });
      return {
        ...state,
        tokens: {
          ...state.tokens,
          data: [...state.tokens.data],
        },
      };

    case AT.LOAD_LAST_TRADE_BY_TOKEN_FAILURE:
      return {
        ...state,
        tokens: {
          ...state.tokens,
          data: state.tokens.data.map(t => {
            t.currentPrice = 'Load Failure';
            return t;
          }),
        },
      };

    case AT.LAST_TRADE_RECEIVED:
      if (action.data) {
        state.tokens.data = state.tokens.data.map(t => {
          t.currentPrice = action.data.data[t.symbol].icxPrice;
          return t;
        });
        return {
          ...state,
        };
      } else {
        return { ...state };
      }
    default:
      return {
        ...state,
      };
  }
};
