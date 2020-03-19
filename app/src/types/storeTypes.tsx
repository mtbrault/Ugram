import { initialAuth } from './authTypes';
import { initialProfile, initialSearch } from './profileTypes';
import { postList } from './postTypes';

export interface storeTypes {
	authReducers: initialAuth;
	profileReducers: initialProfile;
	postReducers: postList;
	searchReducers: initialSearch;
}