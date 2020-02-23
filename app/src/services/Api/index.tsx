import axios from 'axios';
import Cookies from 'js-cookie';
import { loginParam, registerParam, updateProfileParam, profileType, uploadType } from '../../types';

const API = axios.create({
	baseURL: 'http://localhost:8080',
});

API.interceptors.request.use(({ headers, ...config }) => ({
	...config,
	headers: {
		...headers,
		'Content-Type': 'application/json',
		Authorization: `Bearer ${headers.Authorization || Cookies.get('token')}`,
	},
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
		const res = await API.get('/user?page=0&limit=100&noself=1');
		res.data.users.map(async (user: profileType) => {
			const publication = await API.get(`/user/${user.id}/post?limit=0`);
			user.publications = publication.data.posts;
		});
		return res.data;
	}

	static async getMyProfile() {
		const res = await API.get('/self');
		if (!res.data)
			return res;
		const users = [res.data];
		const post = await API.get('/self/post?limit=0');
		users[0].publications = post.data.posts;
		return {
			users,
		};
	}

	static async updateProfile(param: updateProfileParam) {
		const res = await API.patch('/self', param);
		if (!res.data)
			return res;
		return {
			users: [res.data]
		}
			;
	}

	static async updatePost(id: string, param: uploadType) {
		const res = await API.patch(`/post/${id}`, param);
		return res.data;
	}

	static async uploadPost(param: uploadType) {
		const res = await API.post('/post', param);
		if (!res.data)
			return res;
		return res.data;
	}

	static async getAllPost() {
		const res = await API.get('/post?limit=0');
		return res.data;
	}

	static async deletePost(id: string) {
		const res = await API.delete(`/post/${id}`);
		return res.data;
	}
}