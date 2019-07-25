import AT from '../actionTypes';

const initialState = {
  sockets: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AT.SET_SOCKET:
      return {
        ...action.data,
      };
    case AT.REMOVE_SOCKET:
      return {
        ['sockets']: {},
      };
    default:
      return {
        ...state,
      };
  }
};
