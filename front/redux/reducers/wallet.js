// import produce from 'immer';
import AT from '../actionTypes';

const INITIAL_STATE = {
  wallet: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.LOAD_ADDRESS_REQUEST:
      return {
        ...state,
      };
    case AT.LOAD_ADDRESS_SUCCESS:
      return {
        ...state,
        wallet: action.address,
      };
    default:
      return {
        ...state,
      };
  }
};
