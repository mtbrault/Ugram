import { initialAuth } from './authTypes';
import { initialProfile } from './profileTypes';

export interface storeTypes {
	authReducers: initialAuth;
	profileReducers: initialProfile;
}