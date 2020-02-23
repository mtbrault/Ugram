import { publicationType } from './profileTypes';

export interface postList {
	posts: publicationType[];
}

export interface uploadType {
	imageUrl: string;
	description: string;
	hashtags: string[];
	mentions: string[];
	id?: string;
}