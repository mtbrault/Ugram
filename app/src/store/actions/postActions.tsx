import { createActionThunk } from 'redux-thunk-actions';
import APIManger from '../../services/Api';
import { GET_ALL_POST, REACT_TO_POST } from '../reducers/postReducers';

export const getAllPost = createActionThunk(GET_ALL_POST, async () => {
	const res = await APIManger.getAllPost();
	return res;
});

export const upVote = createActionThunk(REACT_TO_POST, async (postId: string) => {
	const res = await APIManger.reactUp(postId);
	return res;
});

export const downVote = createActionThunk(REACT_TO_POST, async (postId: string) => {
	const res = await APIManger.reactDown(postId);
	return res;
});

export const unvote = createActionThunk(REACT_TO_POST, async (postId: string) => {
	const res = await APIManger.unreact(postId);
	return res;
});