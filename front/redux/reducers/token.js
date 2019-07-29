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
      return changeState('ARR', REDUX_STEP.FAILURE, state, 'tokens');
    case AT.SET_CURRENT_TOKEN_SYMBOL:
      return {
        ...state,
        currentToken: {
          symbol: action.symbol,
        },
      };
    case AT.SET_CURRENT_TOKEN_INFO:
      return {
        ...state,
        currentToken: action.data,
      };
    case AT.LAST_TRADE_RECEIVED:
      state.tokens.data.map(t => {
        t.currentPrice = action.data[t.symbol].icxPrice;
        return t;
      });
      return {
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
};
