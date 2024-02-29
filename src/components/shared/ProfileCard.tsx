import { IUser } from '@/types';
import { Link } from 'react-router-dom';

export type UserProfileProps = {
  user: IUser;
};

const ProfileCard = ({ user }: UserProfileProps) => {
  return (
    <>
      <Link to='/profile'>
        <div className='d-flex'>
          <div className='profileImage'>
            <img
              className='profileImg'
              src={user?.imageUrl ? user?.imageUrl : '/assets/profile/profilePic.jpg'}
              alt='profile'
            />
          </div>
          <div className='align-items-center'>
            <div className='profileName'>{user?.name || user?.username}</div>
            <p className='userName'> @{user?.username}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProfileCard;
