import { handleActions } from 'redux-actions';
import { initialProfile } from '../../types/profileTypes';

const initialState: initialProfile = {
	myProfile: {
		id: '',
		username: '',
		firstname: '',
		lastname: '',
		email: '',
		phoneNumber: '',
		createdAt: '',
		profilePic: '',
		publications: [],
	},
	users: [],
	next: '/user?page=0&limit=5&noself=1',
}

export const GET_MY_PROFILE = 'GET_MY_PROFILE';
export const GET_USER_LIST = 'GET_USER_LIST';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const UPLOAD_POST = 'UPLOAD_POST';
export const UPDATE_POST = 'UPDATE_POST';

const SUCCEEDED = 'SUCCEEDED';

export default handleActions<initialProfile>(
	{
		[`${GET_MY_PROFILE}_${SUCCEEDED}`]: (state, { payload }) => ({ ...state, myProfile: payload.users[0] }),
		[`${UPDATE_PROFILE}_${SUCCEEDED}`]: (state, { payload }) => ({ ...state, myProfile: payload.users[0] }),
		[`${GET_USER_LIST}_${SUCCEEDED}`]: ({ users, ...state }, { payload }) => ({ ...state, users: [...users, ...payload.users], next: payload.next }),
		[`${UPLOAD_POST}_${SUCCEEDED}`]: (state) => ({ ...state }),
		[`${UPDATE_POST}_${SUCCEEDED}`]: (state) => ({ ...state }),
	},
	initialState,
)