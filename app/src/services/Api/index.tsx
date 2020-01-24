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
	static test(value: string) {
		return value;
	}
}