import { createActionThunk } from 'redux-thunk-actions';
import APIManager from '../../services/Api';
import { SEARCH_POST_DESC, SEARCH_POST_HASHTAG, SEARCH_USER } from '../reducers/searchReducers';

export const searchUserByUsername = createActionThunk(SEARCH_USER, async (search: string) => {
	const res = await APIManager.searchUser(search);
	return {
		users_list: res,
	};
});

export const searchPostByHashtag = createActionThunk(SEARCH_POST_HASHTAG, async (search: string) => {
	const res = await APIManager.searchPostHashtag(search);
	return {
		posts_hashtag: res,
	};
});

export const searchPostByDesc = createActionThunk(SEARCH_POST_DESC, async (search: string) => {
	const res = await APIManager.searchPostDesc(search);
	return {
		posts_desc: res,
	};
});