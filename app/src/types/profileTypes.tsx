export interface initialProfile {
	username: string;
	name: string;
	email: string;
	phoneNumber: string;
	registerDate: string;
	profilePicture: string;
}

export interface updateProfileParam {
	name: string;
	email: string;
	phoneNumber: string;
	profilePicture: string;
}