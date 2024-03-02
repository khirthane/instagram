import { Models } from 'appwrite';

export type ISignInFrom = {
  email: string;
  password: string;
};

export type INewUser = {
  name: string;
  email: string;
  username: string;
  password: string;
};

export type ICreateUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  imageUrl: string;
  bio: string;
};

export type IUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  imageUrl: URL;
  bio: string;
  post: string;
  liked: string;
  accountId: string;
  imageId: string;
  save: Models.Document[];
  themeType: string;
  contactNo: string;
  location: string;
  country: string;
  postalCode: string;
};

export type IPost = {
  creator: string;
  likes: string[];
  caption: string;
  tags: string;
  imageUrl: string;
  imageId: string;
  location: string;
  post: Models.Document[];
};

export type IModelPost = Models.Document & IPost;
export type IModelUser = Models.Document & IUser;

export type IUserList = {
  total: number;
  documents: IModelUser[];
};
