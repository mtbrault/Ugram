import { handleActions } from 'redux-actions';
import { postList } from '../../types/postTypes';

const initialState: postList = {
	posts: []
}

export const GET_ALL_POST = 'GET_ALL_POST';

const SUCCEEDED = 'SUCCEEDED';

export default handleActions<postList>(
	{
		[`${GET_ALL_POST}_${SUCCEEDED}`]: (state, { payload }) => ({ ...state, ...payload }),
	},
	initialState,
)