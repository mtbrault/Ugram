import { createActionThunk } from 'redux-thunk-actions';
import APIManager from '../../services/Api';
import { updateProfileParam, publicationType } from '../../types/profileTypes';
import { GET_MY_PROFILE, UPDATE_PROFILE, GET_USER_LIST, UPLOAD_POST, UPDATE_POST } from '../reducers/profileReducers';

export const getMyProfile = createActionThunk(GET_MY_PROFILE, async () => {
	const res = await APIManager.getMyProfile();
	console.log(res);
	return res;
});

export const getAllUsers = createActionThunk(GET_USER_LIST, async (next: string) => {
	const res = await APIManager.getListUsers(next);
	return res;
});

export const updateProfile = createActionThunk(UPDATE_PROFILE, async (param: updateProfileParam) => {
	const res = await APIManager.updateProfile(param);
	return res;
});

export const uploadPost = createActionThunk(UPLOAD_POST, async (param: publicationType) => {
	const res = await APIManager.uploadPost(param);
	return res;
});

export const updatePost = createActionThunk(UPDATE_POST, async (id: Number, param: publicationType) => {
	const res = await APIManager.updatePost(id, param);
	return res;
});