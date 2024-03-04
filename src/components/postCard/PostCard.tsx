import { Models } from 'appwrite';
import LikeButton from '../shared/LikeButton';
import PostCardHeader from '../shared/PostCardHeader';
import SaveButton from '../shared/SaveButton';

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
