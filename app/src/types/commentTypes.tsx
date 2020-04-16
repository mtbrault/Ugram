
export interface commentType {
  author: {
    username: string;
  }
  content: string;
  createdAt: string;
}

export interface reactionType {
  upvotes: number;
  downvotes: number;
  upvoted: boolean;
  downvoted: boolean;
  voted: boolean;
}

export interface initialComment {
  comments: commentType[];
  reaction: reactionType;
}