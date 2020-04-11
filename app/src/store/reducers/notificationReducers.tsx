import { handleActions } from 'redux-actions';
import { initialNotif } from '../../types';

const initialState: initialNotif = {
	notifications: [],
}

export const GET_NOTIF = 'GET_NOTIF';
export const READ_NOTIF = 'READ_NOTIF';

const SUCCEEDED = 'SUCCEEDED';

export default handleActions<initialNotif>(
	{
		[`${GET_NOTIF}_${SUCCEEDED}`]: (state, { payload }) => ({ ...state, ...payload }),
		[`${READ_NOTIF}_${SUCCEEDED}`]: (state) => ({ ...state }),
	},
	initialState,
)