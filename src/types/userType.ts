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

export type UserType = {
  id: string;
  name: string;
  username: string;
  email: string;
  imageUrl: string;
  bio: string;
  post: string;
  liked: string;
  accountId: string;
  imageId: string;
  save: Models.Document[];
};

export type Post = {
  creator: string;
  likes: string[];
  caption: string;
  tags: string;
  imageUrl: string;
  imageId: string;
  location: string;
  post: Models.Document[];
};

export type IPost = Models.Document & Post;
export type IUser = Models.Document & UserType;

export type IUserList = {
  total: number;
  documents: IUser[];
};
