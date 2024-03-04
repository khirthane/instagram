import { useUserContext } from '@/context/AuthContext';
import { useLikePost } from '@/utils/react-query/queries';
import { Models } from 'appwrite';
import { useState } from 'react';
import { PostCardProps } from '../postCard/PostCard';
import Loader from './Loader';

const LikeButton = ({ post }: PostCardProps) => {
  const { mutate: likePost, isPending } = useLikePost();
  const likesList = post.likes.map((user: Models.Document) => user.$id);
  const [likes, setLikes] = useState(likesList);
  const { user } = useUserContext();

  const checkIsLiked = (likes: string[], userId: string) => {
    return likes.includes(userId);
  };

  const onLikeClicked = () => {
    let likesArray = [...likes];

    if (likesArray.includes(user.id)) {
      likesArray = likesArray.filter((Id) => Id !== user.id);
    } else {
      likesArray.push(user.id);
    }

    setLikes(likesArray);
    likePost({ postId: post.$id, userIdsliked: likesArray });
  };
  return (
    <div className='d-flex'>
      {isPending ? (
        <Loader size={20} />
      ) : (
        <>
          <img
            src={
              checkIsLiked(likes, user.id) ? '/assets/images/liked.svg' : '/assets/images/like.svg'
            }
            className='likeButton'
            alt='like'
            onClick={onLikeClicked}
            width={20}
            height={20}
          />
        </>
      )}

      <span className='likesCount mx-1'> {likes.length}</span>
    </div>
  );
};

export default LikeButton;
