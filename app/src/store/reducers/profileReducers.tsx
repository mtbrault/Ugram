import { handleActions } from 'redux-actions';
import { initialProfile, profileType } from '../../types/profileTypes';

const initialState: initialProfile = {
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
}

export const GET_MY_PROFILE = 'GET_MY_PROFILE';
export const GET_USER_LIST = 'GET_USER_LIST';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';

const SUCCEEDED = 'SUCCEEDED';

export default handleActions<initialProfile, profileType[]>(
	{
		[`${GET_MY_PROFILE}_${SUCCEEDED}`]: (state, { payload }) => ({ ...state, myProfile: payload[0] }),
		[`${UPDATE_PROFILE}_${SUCCEEDED}`]: (state, { payload }) => ({ ...state, myProfile: payload[0] }),
		[`${GET_USER_LIST}_${SUCCEEDED}`]: (state, { payload }) => ({ ...state, listUser: payload }),
	},
	initialState,
)