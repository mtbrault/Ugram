import { handleActions } from 'redux-actions';
import { initialProfile } from '../../types/profileTypes';

const initialState: initialProfile = {
	myProfile: {
		username: '',
		firstname: '',
		lastname: '',
		email: '',
		phoneNumber: '',
		createdAt: '',
		profilePic: '',
		publication: [],
	},
	users: [],
	next: '/user?page=0&limit=5',
}

export const GET_MY_PROFILE = 'GET_MY_PROFILE';
export const GET_USER_LIST = 'GET_USER_LIST';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';


const SUCCEEDED = 'SUCCEEDED';

export default handleActions<initialProfile>(
	{
		[`${GET_MY_PROFILE}_${SUCCEEDED}`]: (state, { payload }) => ({ ...state, myProfile: payload.users[0] }),
		[`${UPDATE_PROFILE}_${SUCCEEDED}`]: (state, { payload }) => ({ ...state, myProfile: payload.users[0] }),
		[`${GET_USER_LIST}_${SUCCEEDED}`]: ({ users, ...state }, { payload }) => ({ ...state, users: [...users, ...payload.users], next: payload.next }),
	},
	initialState,
)