import { createActionThunk } from 'redux-thunk-actions';
import APIManager from '../../services/Api';
import { updateProfileParam } from '../../types/profileTypes';
import { GET_PROFILE, UPDATE_PROFILE } from '../reducers/profileReducers';

export const getMyProfile = createActionThunk(GET_PROFILE, async () => {
	const res = await APIManager.getMyProfile();
	return res;
});

export const getProfileById = createActionThunk(GET_PROFILE, async (id: Number) => {
	const res = await APIManager.getProfile(id);
	return res;
});

export const updateProfile = createActionThunk(UPDATE_PROFILE, async (param: updateProfileParam) => {
	const res = await APIManager.updateProfile(param);
	return res;
});