import { createActionThunk } from 'redux-thunk-actions';
import APIManager from '../../services/Api';
import { updateProfileParam, uploadType } from '../../types';
import { GET_MY_PROFILE, UPDATE_PROFILE, GET_USER_LIST, UPLOAD_POST, UPDATE_POST, DELETE_POST } from '../reducers/profileReducers';

export const getMyProfile = createActionThunk(GET_MY_PROFILE, async () => {
	const res = await APIManager.getMyProfile();
	return res;
});

export const getAllUsers = createActionThunk(GET_USER_LIST, async () => {
	const res = await APIManager.getListUsers();
	return res;
});

export const updateProfile = createActionThunk(UPDATE_PROFILE, async (param: updateProfileParam) => {
	const res = await APIManager.updateProfile(param);
	return res;
});

export const uploadPost = createActionThunk(UPLOAD_POST, async (param: uploadType) => {
	const res = await APIManager.uploadPost(param);
	return res;
});

export const updatePost = createActionThunk(UPDATE_POST, async (id: string = '', param: uploadType) => {
	const res = await APIManager.updatePost(id, param);
	return res;
});

export const deletePost = createActionThunk(DELETE_POST, async (id: string = '') => {
	const res = await APIManager.deletePost(id);
	return res;
})