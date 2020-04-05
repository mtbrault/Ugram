export interface loginParam {
	username: string;
	password: string;
}

export interface loginGoogleParam {
	accessToken: string;
	tokenId: string;
}

export interface registerParam {
	username: string;
	firstname: string;
	lastname: string;
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
