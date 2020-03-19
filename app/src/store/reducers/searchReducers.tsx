import { handleActions } from 'redux-actions';
import { initialSearch } from '../../types/profileTypes';

const initialState: initialSearch = {
	users_list: [],
	posts_hashtag: [],
	posts_desc: [],
	loading: false,
};

export const SEARCH_POST_HASHTAG = 'SEARCH_POST_HASHTAG';
export const SEARCH_POST_DESC = 'SEARCH_POST_DESC';
export const SEARCH_USER = 'SEARCH_USER';

const SUCCEEDED = 'SUCCEEDED';
const STARTED = 'STARTED';

export default handleActions<initialSearch>(
	{
		[`${SEARCH_USER}_${SUCCEEDED}`]: (state, { payload }) => ({ ...state, ...payload }),
		[`${SEARCH_USER}_${STARTED}`]: (state) => ({ ...state, loading: true }),
		[`${SEARCH_POST_HASHTAG}_${SUCCEEDED}`]: (state, { payload }) => ({ ...state, ...payload }),
		[`${SEARCH_POST_DESC}_${SUCCEEDED}`]: (state, { payload }) => ({ ...state, ...payload }),
	},
	initialState,
);