export const initialState = {
  address: '',
};

export const REQUEST_ADDRESS = 'REQUEST_ADDRESS';
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
