export interface loginParam {
	email: string;
	password: string;
}

export interface registerParam {
	username: string;
	name: string;
	email: string;
	phoneNumber: string;
	password: string;
}

export interface initialAuth {
	email: string;
	id: string;
	token: string;
	error: string;
}