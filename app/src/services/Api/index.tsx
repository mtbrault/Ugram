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

	static async getListUsers() {
		const tmp = [
			{
				username: 'test',
				email: 'test@test.fr',
				profilePicture: 'monimage.png',
				firstname: 'Matthieu',
				lastname: 'BRAULT',
				phoneNumber: '0000000000',
				createdAt: '01/01/2020',
			},
			{
				username: 'test2',
				email: 'test@test.fr',
				profilePicture: 'monimage.png',
				firstname: 'Mehdi',
				lastname: 'BRAULT',
				phoneNumber: '0000000000',
				createdAt: '01/01/2020',
			},
			{
				username: 'test3',
				email: 'test@test.fr',
				profilePicture: 'monimage.png',
				firstname: 'Angelo',
				lastname: 'BRAULT',
				phoneNumber: '0000000000',
				createdAt: '01/01/2020',
			}
		]
		return tmp;
	}

	static async getMyProfile() {
		const res = await API.get('/user');
		if (!res.data)
			return res;
		return [res.data];
	}

	static async getProfile(id: Number) {
		const res = await API.get(`/user/${id}`);
		if (res.data)
			return res.data;
		return res;
	}

	static async updateProfile(param: updateProfileParam) {
		const res = await API.put('/user', param);
		if (!res.data)
			return res;
		return [res.data];
	}
}