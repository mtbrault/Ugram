import { handleActions } from 'redux-actions';

const initialState = {
	email: '',
	name: '',
	token: '',
	error: '',
}

export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const TOKEN_INFO = 'TOKEN_INFO';

const SUCCEEDED = 'SUCCEEDED';
const FAILED = 'FAILED';

export default handleActions(
	{
		[`${LOGIN_USER}_${SUCCEEDED}`]: (state, { payload }) => ({ ...state, value: 'Succès' }),
		[`${LOGIN_USER}_${FAILED}`]: (state) => ({ ...state, error: 'Connexion failed' }),
		[`${LOGOUT_USER}_${SUCCEEDED}`]: () => (initialState),
	},
	initialState,
);