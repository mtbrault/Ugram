
export interface commentType {
  author: {
    username: string;
  }
  content: string;
  createdAt: string;
}

export interface initialComment {
	comments: commentType[];
}