export interface initialProfile {
  myProfile: profileType;
  users: profileType[];
  next: string;
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
  publications: publicationType[];
}

export interface updateProfileParam {
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  profilePicture: string;
}

interface mention {
  id: string;
  username: string;
}

export interface publicationType {
  imageUrl: string;
  description: string;
  hashtags: string[];
  mentions: string[] | mention[],
  id?: string;
}
