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
		return API.get('/tokeninfo');
	}

	static async getMyProfile() {
		return {
			username: 'test',
			email: 'test@test.fr',
			profilePicture: 'monimage.png',
			name: 'Matthieu BRAULT',
			phoneNumber: '0000000000',
			registerDate: '01/01/2020',
		}
		console.log(Cookies.get('token'))
		const res = await API.get('/user');
		if (res.data)
			return res.data;
		return res;
	}

	static async getProfile(id: Number) {
		const res = await API.get(`/user/${id}`);
		if (res.data)
			return res.data;
		return res;
	}

	static async updateProfile(param: updateProfileParam) {
		return API.put('/user', param);
	}
}