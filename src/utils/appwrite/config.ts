import { Account, Avatars, Client, Databases, Storage } from 'appwrite';
export const appwriteConfig = {
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  url: import.meta.env.VITE_APPWRITE_URL,
  databaseId: '65bcd985e81602fc82c5',
  storageId: '65bcd18f8d6ec4fb4837',
  savedCollectionId: '65bcd9fe59a4cf7b5432',
  userCollectionId: '65bcd9c624f44dedc190',
  postCollectionId: '65bcd9b1258865b12624',
};

export const client = new Client();
client.setProject('65bbfed06e432e4a9d9b');
client.setEndpoint('https://cloud.appwrite.io/v1');

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
