import { createAction, handleActions } from 'redux-actions';

const initialState = {
  user: null,
  tokenExp: null,
};

const reducer = handleActions({}, initialState);

export default reducer;
