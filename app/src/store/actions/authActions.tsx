import { createActionThunk } from 'redux-thunk-actions';
import APIManager from '../../services/Api';
import { REGISTER_USER, LOGIN_USER, TOKEN_INFO, LOGOUT_USER } from '../reducers/authReducers';
import { loginParam, registerParam } from '../../types/authTypes';

export const loginUser = createActionThunk(LOGIN_USER, async (param: loginParam) => {
	const res = await APIManager.loginUser(param)
	return res;
});

export const registerUser = createActionThunk(REGISTER_USER, async (param: registerParam) => {
	const res = await APIManager.registerUser(param);
	return res;
});

export const tokenInfo = createActionThunk(TOKEN_INFO, async (token: String) => {
	const res = await APIManager.tokenInfo(token);
	return res;
})

export const logoutUser = createActionThunk(LOGOUT_USER, () => {
	return APIManager.logoutUser();
});
