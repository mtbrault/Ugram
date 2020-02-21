import { initialAuth } from './authTypes';
import { initialProfile } from './profileTypes';
import { postList } from './postTypes';

export interface storeTypes {
	authReducers: initialAuth;
	profileReducers: initialProfile;
	postReducers: postList;
}