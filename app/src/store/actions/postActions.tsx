import { createActionThunk } from 'redux-thunk-actions';
import APIManger from '../../services/Api';
import { GET_ALL_POST } from '../reducers/postReducers';

export const getAllPost = createActionThunk(GET_ALL_POST, async () => {
	const res = await APIManger.getAllPost();
	return res;
})