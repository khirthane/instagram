import Loader from '@/components/shared/Loader';
import ProfileCard from '@/components/shared/ProfileCard';
import intl from '@/utils/locales/en.json';
import { useCurrentUser } from '@/utils/react-query/queries';
import { useNavigate } from 'react-router';

const Profile = () => {
  const { data: currentUser, isLoading } = useCurrentUser();
  const navigate = useNavigate();

  const onEditClick = () => {
    navigate('/edit-profile');
  };

  return (
    <>
      <h4>{intl.myProfile}</h4>
      {isLoading && <Loader size={50} />}
      {currentUser && (
        <>
          <div className='card'>
            <div className='d-flex justify-content-between'>
              <ProfileCard user={currentUser} imageSize={150} />

              <div className='profileEdit'>
                <button onClick={onEditClick} className='btn-icon'>
                  <img src='/assets/images/editBtn.svg' width={20} />
                </button>
              </div>
            </div>
          </div>

          <div className='card'>
            <h5>{intl.personalInformation}</h5>
            <div className='d-flex align-content-start flex-wrap'>
              <div className='col-6'>
                <label>{intl.username}</label>
                <p>{currentUser?.username}</p>
              </div>
              <div className='col-6'>
                <label>{intl.name}</label>
                <p>{currentUser?.name}</p>
              </div>
              <div className='col-6'>
                <label>{intl.email}</label>
                <p>{currentUser?.email}</p>
              </div>
              <div className='col-6'>
                <label>{intl.bio}</label>
                <p>{currentUser?.bio}</p>
              </div>
              <div className='col-6'>
                <label>{intl.contactNo}</label>
                <p>{currentUser?.contactNo}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
