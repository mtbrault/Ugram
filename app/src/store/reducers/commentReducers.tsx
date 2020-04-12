import { handleActions } from 'redux-actions';
import { initialComment } from '../../types';

const initialState: initialComment = {
	comments: [],
};

export const GET_COMMENT_BY_ID = 'GET_COMMENT_BY_ID';
export const ADD_COMMENT = 'ADD_COMMENT';

const SUCCEEDED = 'SUCCEEDED';

export default handleActions<initialComment>(
	{
		[`${GET_COMMENT_BY_ID}_${SUCCEEDED}`]: (state, { payload }) => ({ ...state, ...payload }),
		[`${ADD_COMMENT}_${SUCCEEDED}`]: (state, { payload }) => ({ ...state, ...payload }),
	},
	initialState,
);