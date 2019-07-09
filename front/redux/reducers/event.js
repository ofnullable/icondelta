import AT from '../actionTypes';

const initialState = {
  requestIds: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AT.JSON_RPC_REQUEST:
      return {
        requestIds: {
          ...action.ids,
        },
      };
    case AT.RESPONSE_COMPLETE:
      delete state.requestIds[action.id];
      return {
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
};
