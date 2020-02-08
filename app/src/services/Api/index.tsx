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
	static async registerUser(param: registerParam) {
		const res = await API.post('/auth/register', param);
		if (res.data)
			return res.data;
		return res;
	}

	static async loginUser(param: loginParam) {
		const res = await API.post('/auth/login', param);
		if (res.data)
			return res.data;
		return res;
	}

	static tokenInfo(token: String) {
		return API.get('/tokeninfo', { headers: { Authorization: token } });
	}

	static logoutUser() {
		return API.post('/auth/logout');
	}
}