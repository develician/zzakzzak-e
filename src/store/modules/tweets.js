import { handleActions, createAction } from 'redux-actions';
import { applyPenders } from 'redux-pender';
import * as api from 'lib/api';

const GET_INITIAL = 'tweets/GET_INITIAL';
const GET_RECENT = 'tweets/GET_RECENT';
const GET_NEXT = 'tweets/GET_NEXT';

export const getInitial = createAction(GET_INITIAL, api.getList);
export const getRecent = createAction(GET_RECENT, api.getList);
export const getNext = createAction(GET_NEXT, api.getList);

const initialState = {
  list: [],
  end: false,
};

const reducer = handleActions({}, initialState);

export default applyPenders(reducer, [
  {
    type: GET_INITIAL,
    onSuccess: (state, action) => {
      return {
        ...state,
        list: action.payload.data,
        end: action.payload.data.length < 10,
      };
    },
  },
  {
    type: GET_RECENT,
    onSuccess: (state, action) => {
      return {
        ...state,
        list: action.payload.data.concat(state.list),
      };
    },
  },
  {
    type: GET_NEXT,
    onSuccess: (state, action) => {
      return {
        ...state,
        list: state.list.concat(action.payload.data),
        end: action.payload.data.length < 10,
      };
    },
  },
]);
