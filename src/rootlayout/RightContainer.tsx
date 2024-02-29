import Loader from '@/components/shared/Loader';
import ProfileCard from '@/components/shared/ProfileCard';
import ThemeSwitcher from '@/components/themeToggle/ThemeToggle';
import intl from '@/utils/locales/en.json';
import { useTopUsers } from '@/utils/react-query/queries';

const RightContainer = () => {
  const { data: users, isLoading } = useTopUsers();

  return (
    <>
      <ThemeSwitcher />

      <h5 className='mt-4'> {intl.topUsers}</h5>
      {isLoading && (
        <div className='loading'>
          <Loader size={30} />
        </div>
      )}
      <div className='mt-4'>
        {users?.documents.map((user) => (
          <div key={user.$id}>
            <ProfileCard user={user} />{' '}
          </div>
        ))}
      </div>
    </>
  );
};

export default RightContainer;
