import { handleActions } from 'redux-actions';
import { initialComment } from '../../types';

const initialState: initialComment = {
	comments: [],
	reaction: {
		upvotes: 0,
		downvotes: 0,
		upvoted: false,
		downvoted: false,
		voted: false,
	}
};

export const GET_COMMENT_BY_ID = 'GET_COMMENT_BY_ID';
export const ADD_COMMENT = 'ADD_COMMENT';
export const GET_REACTION_BY_ID = 'GET_REACTION_BY_ID';

const SUCCEEDED = 'SUCCEEDED';

export default handleActions<initialComment>(
	{
		[`${GET_COMMENT_BY_ID}_${SUCCEEDED}`]: (state, { payload }) => ({ ...state, ...payload }),
		[`${ADD_COMMENT}_${SUCCEEDED}`]: (state, { payload }) => ({ ...state, ...payload }),
		[`${GET_REACTION_BY_ID}_${SUCCEEDED}`]: (state, { payload }) => ({ ...state, ...payload }),
	},
	initialState,
);