import { ID, Query } from 'appwrite';

import { IModelUser, INewUser, IUser, IUserList } from '@/types';
import { account, appwriteConfig, avatars, databases } from './config';
import { deleteFileApi, getFilePreview, uploadFileApi } from './postApi';

// SIGN UP
export async function createUserAccountApi(user: INewUser): Promise<IModelUser> {
  try {
    const newAccount = await account.create(ID.unique(), user.email, user.password, user.name);

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(user.name);

    const newUser: IModelUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarUrl,
    });

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error('Not able to create a new user');
  }
}

// SAVE USER TO DB
export async function saveUserToDB(user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: URL;
  username?: string;
}) {
  try {
    const newUser: IModelUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user,
    );

    return newUser;
  } catch (error) {
    throw new Error('Not able to create a new user');
  }
}

// SIGN IN
export async function signInAccountApi(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailSession(user.email, user.password);

    return session;
  } catch (error) {
    console.log(error);
  }
}

// GET ACCOUNT
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    console.log(error);
  }
}

// GET USER
export async function getCurrentUser(): Promise<IModelUser> {
  try {
    const currentAccount = await getAccount();

    if (!currentAccount) throw Error;

    const currentUser: IUserList = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)],
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    throw new Error('Not able to get the User data');
  }
}

// SIGN OUT
export async function signOutAccountApi() {
  try {
    const session = await account.deleteSession('current');

    return session;
  } catch (error) {
    console.log(error);
  }
}

// GET TOP Users
export async function getTopUsersApi(): Promise<IUserList> {
  try {
    const users: IUserList = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.orderDesc('$createdAt')],
    );

    if (!users) throw Error;

    return users;
  } catch (error) {
    throw new Error('Not able to get the users list');
  }
}

// Update User
export type UserUpdate = {
  user: IUser;
  userId: string;
  image?: File;
};
export async function updateUserApi({ user, userId, image }: UserUpdate) {
  try {
    if (image) {
      const uploadedFile = await uploadFileApi(image);
      if (!uploadedFile) throw Error;

      // Get file url
      const fileUrl = getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteFileApi(uploadedFile.$id);
        throw Error;
      }
      user.imageUrl = fileUrl;
    }
    const users = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId,
      user,
    );

    if (!users) throw Error;

    return users;
  } catch (error) {
    throw new Error('Not able to update the user');
  }
}
