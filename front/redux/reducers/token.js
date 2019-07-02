import produce from 'immer';
import AT from '../actionTypes';

const INITIAL_STATE = {
  tokenList: '',
};

export default (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      default:
        return;
    }
  });
};
