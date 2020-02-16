import axios from 'axios';
import Cookies from 'js-cookie';
import { loginParam, registerParam } from '../../types/authTypes';
import { updateProfileParam } from '../../types/profileTypes';

const API = axios.create({
	baseURL: 'http://localhost:8080',
});

API.interceptors.request.use(({ headers, ...config }) => ({
	...config,
	headers: {
		...headers,
		'Content-Type': 'application/json',
		Authorization: `Bearer ${headers.Authorization || Cookies.get('token')}`,
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

	static tokenInfo() {
		return API.get('/auth/tokeninfo');
	}

	static async getListUsers(next: string) {
		const res = await API.get(next);
		console.log(res.data);
		return res.data;
	}

	static async getMyProfile() {
		const res = await API.get('/self');
		if (!res.data)
			return res;
		return {
			users: [res.data]
		};
	}

	static async getProfile(id: Number) {
		const res = await API.get(`/user/${id}`);
		if (res.data)
			return res.data;
		return {
			users: [res.data]
		};
	}

	static async updateProfile(param: updateProfileParam) {
		const res = await API.patch('/self', param);
		if (!res.data)
			return res;
		return [res.data];
	}
}