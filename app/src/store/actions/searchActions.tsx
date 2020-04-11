import { createActionThunk } from 'redux-thunk-actions';
import APIManager from '../../services/Api';
import { SEARCH_POST_DESC, SEARCH_POST_HASHTAG, SEARCH_USER, SEARCH_AUTOCOMPLETE } from '../reducers/searchReducers';

export const searchUserByUsername = createActionThunk(SEARCH_USER, async (search: string, autocomplete: boolean = false) => {
	const res = await APIManager.searchUser(search, autocomplete);
	return {
		users_list: res.users,
	};
});

export const searchPostByHashtag = createActionThunk(SEARCH_POST_HASHTAG, async (search: string, autocomplete: boolean = false) => {
	const res = await APIManager.searchPostHashtag(search, autocomplete);
	return {
		posts_hashtag: res.posts,
	};
});

export const searchPostByDesc = createActionThunk(SEARCH_POST_DESC, async (search: string, autocomplete: boolean = false) => {
	const res = await APIManager.searchPostDesc(search, autocomplete);
	return {
		posts_desc: res.posts,
	};
});