import { handleActions } from 'redux-actions';
import { initialAuth } from '../../types/authTypes'

const initialState: initialAuth = {
	email: '',
	id: '',
	token: '',
	error: '',
}

export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const TOKEN_INFO = 'TOKEN_INFO';

const SUCCEEDED = 'SUCCEEDED';
const FAILED = 'FAILED';

export default handleActions(
	{
		[`${LOGIN_USER}_${SUCCEEDED}`]: (state, { payload }) => ({ ...state, ...payload, error: '' }),
		[`${LOGIN_USER}_${FAILED}`]: (state) => ({ ...state, error: 'Connexion failed' }),
		[`${REGISTER_USER}_${SUCCEEDED}`]: (state, { payload }) => ({ ...state, ...payload, error: '' }),
	},
	initialState,
);