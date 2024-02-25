import { Models } from 'appwrite';
import LikeButton from './LikeButton';
import PostCardHeader from './PostCardHeader';
import SaveButton from './SaveButton';
import './postCard.scss';

export type PostCardProps = {
  post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {
  return (
    <article className='postCard' key={post.$id}>
      <PostCardHeader post={post} />
      <p className='postCaption'>{post.caption}</p>
      <div className='postImg'>
        <img src={post.imageUrl} className='postImage'></img>
      </div>
      <div className='d-flex d-flex justify-content-between mt-2'>
        <LikeButton post={post} />
        <SaveButton post={post} />
      </div>
    </article>
  );
};

export default PostCard;
