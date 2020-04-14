export interface notificationType {
	text: string;
	userId: string;
	id: string;
	isRead: boolean;
}

export interface keywordType {
	word: string;
	number: number;
}

export interface initialNotif {
	notifications: notificationType[];
	keywords: keywordType[];
}