import { PostCardProps } from '@/components/postCard/PostCard';
import { readabletime } from '@/utils/lib/readableTime';
import { Link } from 'react-router-dom';

const PostCardHeader = ({ post }: PostCardProps) => {
  return (
    <Link to='/profile'>
      <div className='d-flex'>
        <div className='d-flex flex-row justify-content-center mb-4'>
          <img src={post?.creator?.imageUrl} className='profileImg' width={50} height={50} />
          <div className='align-items-center'>
            <div className='profileName'>{post?.creator?.name || post?.creator?.username}</div>
            <span className='postedDate'>
              {' '}
              {readabletime(post?.$createdAt)}
              {','}
            </span>
            <span className='location'> {post?.location}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCardHeader;
