import { ICreatePost } from '@/types';
import { ID, Query } from 'appwrite';
import { appwriteConfig, databases, storage } from './config';

export async function createPostApi(post: ICreatePost) {
  try {
    // Upload file to appwrite storage
    const uploadedFile = await uploadFileApi(post.file[0]);

    if (!uploadedFile) throw Error;

    // Get file url
    const fileUrl = getFilePreview(uploadedFile.$id);
    if (!fileUrl) {
      await deleteFileApi(uploadedFile.$id);
      throw Error;
    }

    // Convert tags into array
    const tags = post.tags?.replace(/ /g, '').split(',') || [];

    // Create post
    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      ID.unique(),
      {
        creator: post.user,
        caption: post.caption,
        imageUrl: fileUrl,
        imageId: uploadedFile.$id,
        location: post.location,
        tags: tags,
      },
    );

    if (!newPost) {
      await deleteFileApi(uploadedFile.$id);
      throw Error;
    }

    return newPost;
  } catch (error) {
    console.log(error);
  }
}

export function getFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000,
      'top',
      100,
    );

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    console.log(error);
  }
}

export async function uploadFileApi(file: File) {
  try {
    const uploadedFile = await storage.createFile(appwriteConfig.storageId, ID.unique(), file);

    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteFileApi(fileId: string) {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId);

    return { status: 'ok' };
  } catch (error) {
    console.log(error);
  }
}

export async function getRecentPostApi() {
  try {
    const post = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.orderDesc('$createdAt'), Query.limit(20)],
    );
    return post;
  } catch (error) {
    console.log(error);
  }
}

export async function likePostApi(postId: string, userIdsliked: string[]) {
  try {
    const post = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId,
      {
        likes: userIdsliked,
      },
    );
    return post;
  } catch (error) {
    console.log(error);
  }
}

export async function savePostApi(postId: string, userId: string) {
  try {
    const post = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savedCollectionId,
      ID.unique(),
      {
        user: userId,
        post: postId,
      },
    );
    return post;
  } catch (error) {
    console.log(error);
  }
}

export async function removeSavedPostApi(savedPostId: string) {
  try {
    const post = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savedCollectionId,
      savedPostId,
    );
    return post;
  } catch (error) {
    console.log(error);
  }
}

export async function getInfinitePostApi({ pageParam }: { pageParam: number }) {
  try {
    const queries: any[] = [Query.orderDesc('$updatedAt'), Query.limit(8)];
    if (pageParam) {
      queries.push(Query.cursorAfter(pageParam.toString()));
    }

    const post = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.orderDesc('$updatedAt'), Query.limit(9)],
    );
    return post;
  } catch (error) {
    throw new Error('Not able to fetch the post');
  }
}
