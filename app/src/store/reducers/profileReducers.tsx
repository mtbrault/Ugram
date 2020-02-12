import { handleActions } from 'redux-actions';
import { initialProfile, profileType } from '../../types/profileTypes';

/*const initialState: initialProfile = {
	myProfile: {
		username: '',
		firstname: '',
		lastname: '',
		email: '',
		phoneNumber: '',
		createdAt: '',
		profilePic: '',
	},
	listUser: [],
}*/

const initialState: initialProfile = {
	username: '',
	firstname: '',
	lastname: '',
	email: '',
	phoneNumber: '',
	createdAt: '',
	profilePic: '',
}

export const GET_MY_PROFILE = 'GET_MY_PROFILE';
export const GET_USER_LIST = 'GET_USER_LIST';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';

const SUCCEEDED = 'SUCCEEDED';

export default handleActions(
	{
		[`${GET_MY_PROFILE}_${SUCCEEDED}`]: (state, { payload }) => ({ ...state, ...payload }),
		[`${UPDATE_PROFILE}_${SUCCEEDED}`]: (state, { payload }) => ({ ...state, ...payload }),
	},
	initialState,
)