import AT from '../actionTypes';

const initialState = {
  requestIds: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AT.JSON_RPC_REQUEST:
      const idArray = Object.keys(action.ids);
      return {
        requestIds: {
          ...action.ids,
        },
      };
    default:
      return {
        ...state,
      };
  }
};
