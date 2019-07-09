import AT from '../actionTypes';
import { changeState } from '../../utils/utils';
import { INITIAL_STATE, REDUX_STEP } from '../../utils/const';

const initialState = {
  asks: INITIAL_STATE['ARR'],
  bids: INITIAL_STATE['ARR'],
  tradeHistory: INITIAL_STATE['ARR'],
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return {
        ...state,
      };
  }
};
