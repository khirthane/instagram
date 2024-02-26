import Loader from '@/components/shared/Loader';
import ProfileCard from '@/components/shared/ProfileCard';
import { useTopUsers } from '@/utils/react-query/queries';
import { Models } from 'appwrite';

const RightContainer = () => {
  const { data: users, isLoading } = useTopUsers();

  return (
    <>
      <h5 className='mt-4'> Top Users</h5>
      {isLoading && (
        <div className='loading'>
          <Loader size={30} />
        </div>
      )}
      <div className='m-4'>
        {users?.documents.map((user: Models.Document) => <ProfileCard user={user} />)}
      </div>
    </>
  );
};

export default RightContainer;
