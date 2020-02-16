export interface initialProfile {
  myProfile: profileType;
  users: profileType[];
  next: string;
}

export interface profileType {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  profilePic: string;
}

export interface updateProfileParam {
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  profilePicture: string;
}