export interface notificationType {
	text: string;
	userId: string;
	id: string;
	isRead: boolean;
}

export interface initialNotif {
	notifications: notificationType[];
}