import Loader from '@/components/shared/Loader';
import { useGetRecentPost } from '@/utils/react-query/queries';
import { Models } from 'appwrite';
import PostCard from '../../components/postCard/PostCard';

const Home = () => {
  const { data: post, isLoading, isError } = useGetRecentPost();

  return (
    <>
      {isLoading && (
        <div className='loading'>
          <Loader size={50} />
        </div>
      )}
      {isError && <div className='error'>Error</div>}
      {post?.documents.map((post: Models.Document) => (
        <PostCard post={post} key={post.$id} />
      ))}
    </>
  );
};

export default Home;
