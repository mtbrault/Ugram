import { handleActions } from 'redux-actions';
import { initialProfile } from '../../types/profileTypes';

const initialState: initialProfile = {
	username: '',
	firstname: '',
	lastname: '',
	email: '',
	phoneNumber: '',
	createdAt: '',
	profilePic: '',
}

export const GET_PROFILE = 'GET_PROFILE_BY_ID';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';

const SUCCEEDED = 'SUCCEEDED';

export default handleActions(
	{
		[`${GET_PROFILE}_${SUCCEEDED}`]: (state, { payload }) => ({ ...state, ...payload }),
		[`${UPDATE_PROFILE}_${SUCCEEDED}`]: (state, { payload }) => ({ ...state, ...payload }),
	},
	initialState,
)