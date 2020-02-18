import axios from 'axios';
import Cookies from 'js-cookie';
import { loginParam, registerParam } from '../../types/authTypes';
import { updateProfileParam, profileType } from '../../types/profileTypes';

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
		res.data.users.map((user: profileType) => {
			user.publication = [
				{
					url: 'https://avatars3.githubusercontent.com/u/29895484?s=400&v=4',
					description: 'Zack c\'est un petit marocain',
					hashtag: ['finDuMonde', 'coma'],
					users: ['zgegMou', 'Angelato'],
				},
				{
					url: 'https://avatars3.githubusercontent.com/u/29895484?s=400&v=4',
					description: 'Mehdi le DZ',
					hashtag: ['finDuMonde', 'coma'],
					users: ['zgegMou', 'Angelato'],
				}
			]
		});
		return res.data;
	}

	static async getMyProfile() {
		const res = await API.get('/self');
		if (!res.data)
			return res;
		const users = [res.data];
		users[0].publication = [
			{
				url: 'https://avatars3.githubusercontent.com/u/29895484?s=400&v=4',
				description: 'Zack c\'est un petit marocain',
				hashtag: ['finDuMonde', 'coma'],
				users: ['zgegMou', 'Angelato'],
			},
			{
				url: 'https://avatars3.githubusercontent.com/u/29895484?s=400&v=4',
				description: 'Mehdi le DZ',
				hashtag: ['finDuMonde', 'coma'],
				users: ['zgegMou', 'Angelato'],
			}
		]
		return {
			users,
		};
	}

	static async getProfile(id: Number) {
		const res = await API.get(`/user/${id}`);
		if (res.data) {
			return res.data;
		}
	}

	static async updateProfile(param: updateProfileParam) {
		const res = await API.patch('/self', param);
		if (!res.data)
			return res;
		return [res.data];
	}
}