import { handleActions } from 'redux-actions';
import { initialSearch } from '../../types/profileTypes';

const initialState: initialSearch = {
	users_list: {
    users: [],
    count: 0,
  },
	posts_hashtag: [],
	posts_desc: [],
};

export const SEARCH_POST_HASHTAG = 'SEARCH_POST_HASHTAG';
export const SEARCH_POST_DESC = 'SEARCH_POST_DESC';
export const SEARCH_USER = 'SEARCH_USER';

const SUCCEEDED = 'SUCCEEDED';

export default handleActions<initialSearch>(
	{
		[`${SEARCH_USER}_${SUCCEEDED}`]: (state, { payload }) => ({ ...state, ...payload }),
		[`${SEARCH_POST_HASHTAG}_${SUCCEEDED}`]: (state, { payload }) => ({ ...state, ...payload }),
		[`${SEARCH_POST_DESC}_${SUCCEEDED}`]: (state, { payload }) => ({ ...state, ...payload }),
	},
	initialState,
);