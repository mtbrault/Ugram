import { createActionThunk } from 'redux-thunk-actions';
import { GET_NOTIF, READ_NOTIF } from '../reducers/notificationReducers';
import APIManager from '../../services/Api';

export const getNotif = createActionThunk(GET_NOTIF, async () => {
	const res = await APIManager.getNotifs();
	return res;
});

export const readNotif = createActionThunk(READ_NOTIF, async () => {
	const res = await APIManager.readNotifs();
	return res;
});