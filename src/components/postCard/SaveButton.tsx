import { useCurrentUser, useRemovedSavePost, useSavePost } from '@/utils/react-query/queries';
import { Models } from 'appwrite';
import { useEffect, useState } from 'react';
import Loader from '../shared/Loader';
import { PostCardProps } from './PostCard';

const SaveButton = ({ post }: PostCardProps) => {
  const { mutate: savePost, isPending } = useSavePost();
  const { mutate: removeSave } = useRemovedSavePost();

  const { data: user } = useCurrentUser();
  const [isSaved, setIsSaved] = useState(false);

  const { data: currentUser } = useCurrentUser();

  const savedPostRecord = currentUser?.save.find(
    (res: Models.Document) => res.post.$id === post.$id,
  );

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);

  const onSaveClicked = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.preventDefault();

    if (savedPostRecord) {
      setIsSaved(false);
      return removeSave(savedPostRecord.$id);
    }

    savePost({ postId: post.$id, userId: user?.$id as string });
    setIsSaved(true);
  };

  return (
    <div>
      {isPending ? (
        <Loader size={20} />
      ) : (
        <img
          src={isSaved ? '/assets/images/saved.svg' : '/assets/images/save.svg'}
          className='saveButton'
          onClick={onSaveClicked}
          alt='like'
          width={22}
        />
      )}
    </div>
  );
};

export default SaveButton;
