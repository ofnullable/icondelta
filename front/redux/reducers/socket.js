import AT from '../actionTypes';

const initialState = {
  sockets: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AT.SET_SOCKET:
      return {
        sockets: action.data,
      };
    case AT.REMOVE_SOCKET:
      return {
        sockets: null,
      };
    default:
      return {
        ...state,
      };
  }
};
