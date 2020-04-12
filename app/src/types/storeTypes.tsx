import { initialAuth } from './authTypes';
import { initialNotif } from './notificationTypes';
import { initialProfile, initialSearch } from './profileTypes';
import { postList } from './postTypes';
import { initialComment } from './commentTypes';

export interface storeTypes {
	authReducers: initialAuth;
	profileReducers: initialProfile;
	postReducers: postList;
	searchReducers: initialSearch;
	notificationReducers: initialNotif;
	commentReducers: initialComment;
}