import AT from '../actionTypes';

const initialState = {
  address: '',

  deposited: {
    icx: 0,
    token: {},
  },
  undeposited: {
    icx: 0,
    token: {},
  },
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
    case AT.LOAD_BALANCE_SUCCESS:
    default:
      return {
        ...state,
      };
  }
};
