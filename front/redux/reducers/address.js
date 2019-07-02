import produce from 'immer';
import AT from '../actionTypes';

const INITIAL_STATE = {
  walletAddress: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return {
        ...state,
      };
  }
};
