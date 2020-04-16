import { createActionThunk } from 'redux-thunk-actions';
import { GET_COMMENT_BY_ID, ADD_COMMENT, GET_REACTION_BY_ID } from '../reducers/commentReducers';
import APIManager from '../../services/Api';

export const getCommentById = createActionThunk(GET_COMMENT_BY_ID, async (id: string) => {
	const res = await APIManager.getComments(id);
	return res;
});

export const addComment = createActionThunk(ADD_COMMENT, async (postId: string, content: string) => {
	const add = await APIManager.addComments(postId, content);
	if (add !== undefined) {
		const res = await APIManager.getComments(postId);
		return res;
	}
	return add;
});

export const getReactionById = createActionThunk(GET_REACTION_BY_ID, async (postId: string) => {
	const res = await APIManager.getReactionById(postId);
	return {
		reaction: res,
	}
});