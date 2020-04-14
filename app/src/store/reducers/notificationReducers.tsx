import { handleActions } from 'redux-actions';
import { initialNotif } from '../../types';

const initialState: initialNotif = {
	notifications: [],
	keywords: [],
}

export const GET_NOTIF = 'GET_NOTIF';
export const READ_NOTIF = 'READ_NOTIF';
export const GET_TOP_HASHTAG = 'GET_TOP_HASHTAG';

const SUCCEEDED = 'SUCCEEDED';

export default handleActions<initialNotif>(
	{
		[`${GET_NOTIF}_${SUCCEEDED}`]: (state, { payload }) => ({ ...state, ...payload }),
		[`${GET_TOP_HASHTAG}_${SUCCEEDED}`]: (state, { payload }) => ({ ...state, ...payload }),
		[`${READ_NOTIF}_${SUCCEEDED}`]: (state) => ({ ...state }),
	},
	initialState,
)