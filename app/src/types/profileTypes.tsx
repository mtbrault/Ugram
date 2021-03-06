export interface initialProfile {
  myProfile: profileType;
  users: profileType[];
  next: string;
}

export interface initialSearch {
  users_list: profileType[];
  posts_hashtag: publicationType[];
  posts_desc: publicationType[];
  loading: boolean;
}

export interface profileType {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  profilePic: string;
  isMe?: boolean;
  publications: publicationType[];
}

export interface updateProfileParam {
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  profilePic: string;
}

export interface updatePostType {
  description: string;
  hashtags: string[];
  mentions: string[];
}

export interface mentionType {
  id: string;
  username: string;
}

export interface publicationType {
  imageUrl: string;
  description: string;
  author: {
    id: string;
    username: string;
  };
  hashtags: string[];
  mentions: mentionType[];
  id: string;
}
