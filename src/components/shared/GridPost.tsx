import { Models } from 'appwrite';
import LikeButton from './LikeButton';
import SaveButton from './SaveButton';

export type PostCardProps = {
  post: Models.Document;
};

const GridPost = ({ post }: PostCardProps) => {
  return (
    <article className='col-3 mt-2' key={post.$id}>
      <div className='gridImageContainer relative'>
        <img src={post.imageUrl} className='postImage'></img>
        <div className='gridImageActions'>
          <img
            src={post?.creator?.imageUrl}
            className='profileImg gridImg'
            width={40}
            height={40}
          />
          <div className='gridImageButtons'>
            <LikeButton post={post} />
            <SaveButton post={post} />
          </div>
        </div>
      </div>
    </article>
  );
};

export default GridPost;
