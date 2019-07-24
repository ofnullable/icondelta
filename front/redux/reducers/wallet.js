import AT from '../actionTypes';
import storage from '../../utils/storage';
import { INITIAL_STATE, REDUX_STEP } from '../../utils/const';
import { changeState } from '../../utils/utils';

const initialState = {
  address: storage.get('address') || null,

  icx: INITIAL_STATE['OBJ'],
  token: INITIAL_STATE['OBJ'],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AT.LOAD_ADDRESS_REQUEST:
      return {
        ...state,
      };
    case AT.LOAD_ADDRESS_SUCCESS:
      return {
        ...state,
        address: action.address,
      };
    case AT.LOAD_ICX_BALANCE_REQUEST:
      return changeState('OBJ', REDUX_STEP.REQUEST, state, 'icx');

    case AT.LOAD_TOKEN_BALANCE_REQUEST:
      return changeState('OBJ', REDUX_STEP.REQUEST, state, 'token');

    case AT.LOAD_ICX_BALANCE_SUCCESS:
      return changeState('OBJ', REDUX_STEP.SUCCESS, state, 'icx', action);

    case AT.LOAD_TOKEN_BALANCE_SUCCESS:
      return changeState('OBJ', REDUX_STEP.SUCCESS, state, 'token', action);

    case AT.LOAD_ICX_BALANCE_FAILURE:
      return changeState('OBJ', REDUX_STEP.FAILURE, state, 'icx', action);

    case AT.LOAD_TOKEN_BALANCE_FAILURE:
      return changeState('OBJ', REDUX_STEP.FAILURE, state, 'token', action);

    default:
      return {
        ...state,
      };
  }
};
