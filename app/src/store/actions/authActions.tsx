import { createActionThunk } from 'redux-thunk-actions';
import APIManager from '../../services/Api';
import { REGISTER_USER, LOGIN_USER, TOKEN_INFO, DELETE_USER } from '../reducers/authReducers';
import { loginParam, registerParam } from '../../types/authTypes';

export const loginUser = createActionThunk(LOGIN_USER, async (param: loginParam) => {
	const res = await APIManager.loginUser(param);
	return res;
});

export const registerUser = createActionThunk(REGISTER_USER, async (param: registerParam) => {
	const res = await APIManager.registerUser(param);
	return res;
});

export const tokenInfo = createActionThunk(TOKEN_INFO, async () => {
	const res = await APIManager.tokenInfo();
	return res;
});

export const deleteUser = createActionThunk(DELETE_USER, async () => {
	const res = await APIManager.deleteUser();
	return res;
});