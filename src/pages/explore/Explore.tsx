import GridPost from '@/components/shared/GridPost';
import Loader from '@/components/shared/Loader';
import { useGetInfinitePost } from '@/utils/react-query/queries';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

function InfinitePostList() {
  const { ref, inView } = useInView();
  const { data: posts, fetchNextPage, hasNextPage, isLoading } = useGetInfinitePost();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (!posts)
    return (
      <div className='flex-center w-full h-full'>
        <Loader />
      </div>
    );

  return (
    <div>
      <h3 className='d-flex justify-content-center'>Explore Post</h3>
      {isLoading && !posts && <Loader size={50} />}
      {posts?.pages.map((page, pageIndex) => (
        <div
          key={pageIndex}
          className='d-flex justify-content-center align-content-start flex-wrap gap-4 mt-4'
        >
          {page?.documents.map((post, index) => (
            <GridPost post={post} key={`page-${index}`} />
          ))}
        </div>
      ))}

      {hasNextPage && (
        <div ref={ref} className='mt-4'>
          <Loader />
        </div>
      )}
      {!hasNextPage && <h4 className='d-flex justify-content-center mt-4'>End of Post</h4>}
    </div>
  );
}

export default InfinitePostList;
