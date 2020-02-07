import axios from 'axios';

const API = axios.create({
	baseURL: 'localhost:8080',
});

API.interceptors.request.use(({ headers, ...config }) => ({
	...config,
	headers: {
		...headers,
		'Content-Type': 'application/json',
	}
}));

export default class APIManager {
	static registerUser(username: String, email: String, password: String) {
		return API.post('/auth/register', { email, username, password });
	}

	static loginUser(email: String, password: String) {
		return API.post('/auth/login', { email, password })
	}

	static tokenInfo(token: String) {
		return API.get('/tokeninfo', { headers: { Authorization: token } });
	}

	static logoutUser() {
		return API.post('/auth/logout');
	}
}