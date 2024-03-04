import { INewUser } from '@/types';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createPostApi,
  getInfinitePostApi,
  getRecentPostApi,
  likePostApi,
  removeSavedPostApi,
  savePostApi,
} from '../appwrite/postApi';
import {
  UserUpdate,
  createUserAccountApi,
  getCurrentUser,
  getTopUsersApi,
  signInAccountApi,
  signOutAccountApi,
  updateUserApi,
} from '../appwrite/userApi';
import { QUERY_KEYS } from './queryKeys';

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccountApi(user),
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentUser,
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) => signInAccountApi(user),
  });
};

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOutAccountApi,
  });
};

export const useCreatePostAccount = () => {
  return useMutation({
    mutationFn: createPostApi,
  });
};

export const useGetRecentPost = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_LATEST_POST],
    queryFn: getRecentPostApi,
  });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, userIdsliked }: { postId: string; userIdsliked: string[] }) =>
      likePostApi(postId, userIdsliked),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_LATEST_POST, data?.$id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};

export const useSavePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, userId }: { postId: string; userId: string }) =>
      savePostApi(postId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};

export const useRemovedSavePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (savedPostId: string) => removeSavedPostApi(savedPostId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};

export const useTopUsers = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_TOP_USERS],
    queryFn: getTopUsersApi,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ user, userId, image }: UserUpdate) => updateUserApi({ user, userId, image }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_TOP_USERS],
      });
    },
  });
};

export const useGetInfinitePost = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_POST],
    queryFn: getInfinitePostApi,
    initialPageParam: 1,
    getNextPageParam: (lastPage: any) => {
      // If there's no data, there are no more pages.
      if (lastPage && lastPage.documents.length === 0) {
        return null;
      }

      // Use the $id of the last document as the cursor.
      const lastId = lastPage.documents[lastPage.documents.length - 1].$id;
      return lastId;
    },
  });
};
