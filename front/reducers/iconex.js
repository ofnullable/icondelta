export const initialState = {
  address: '',
  icxBalance: 0,
  tokenBalance: 0,
};

export const ICONEX_RELAY_RESPONSE = 'ICONEX_RELAY_RESPONSE';

export const RESPONSE_ADDRESS = 'RESPONSE_ADDRESS';

export default (state = initialState, action) => {
  switch (action.type) {
    case RESPONSE_ADDRESS:
      return {
        ...state,
        address: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
