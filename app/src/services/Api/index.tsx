import axios from 'axios';
import Cookies from 'js-cookie';
import { loginParam, registerParam } from '../../types/authTypes';

const API = axios.create({
	baseURL: 'http://localhost:8080',
});

API.interceptors.request.use(({ headers, ...config }) => ({
	...config,
	headers: {
		...headers,
		'Content-Type': 'application/json',
		Authorization: headers.Authorization || Cookies.get('token'),
	}
}));

export default class APIManager {
	static registerUser(param: registerParam) {
		console.log(param);
		return API.post('/auth/register', param);
	}

	static loginUser(param: loginParam) {
		return API.post('/auth/login', param)
	}

	static tokenInfo(token: String) {
		return API.get('/tokeninfo', { headers: { Authorization: token } });
	}

	static logoutUser() {
		return API.post('/auth/logout');
	}
}