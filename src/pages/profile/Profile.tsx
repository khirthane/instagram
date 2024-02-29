import ProfileCard from '@/components/shared/ProfileCard';
import intl from '@/utils/locales/en.json';
import { useCurrentUser } from '@/utils/react-query/queries';

const Profile = () => {
  const { data: currentUser } = useCurrentUser();

  return (
    <>
      <h4>{intl.myProfile}</h4>
      <div className='card'>
        <div className='d-flex justify-content-between'>
          {currentUser && <ProfileCard user={currentUser} />}

          <div className='profileEdit'>
            <button className='btn btn-primary'>Edit</button>
          </div>
        </div>
      </div>

      <div className='card'>
        <h5>Personal Information</h5>
        <div className='d-flex align-content-start flex-wrap'>
          <div className='col-6'>
            <label>Username</label>
            <p>{currentUser?.userName}</p>
          </div>
          <div className='col-6'>
            <label>Name</label>
            <p>{currentUser?.name}</p>
          </div>
          <div className='col-6'>
            <label>Email</label>
            <p>{currentUser?.email}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
