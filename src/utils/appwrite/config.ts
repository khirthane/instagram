import { Account, Avatars, Client, Databases, Storage } from 'appwrite';
export const appwriteConfig = {
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  url: import.meta.env.VITE_APPWRITE_URL,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
  savedCollectionId: import.meta.env.VITE_APPWRITE_SAVED_COLLECTION,
  userCollectionId: import.meta.env.VITE_APPWRITE_USERS_COLLECTION,
  postCollectionId: import.meta.env.VITE_APPWRITE_POST_COLLECTION,
};

export const client = new Client();
client.setProject('65bbfed06e432e4a9d9b');
client.setEndpoint('https://cloud.appwrite.io/v1');

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
