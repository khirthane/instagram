import { IModelUser } from '@/types';
import { Link } from 'react-router-dom';

export type UserProfileProps = {
  user: IModelUser;
  imageSize?: number;
};

const ProfileCard = ({ user, imageSize = 50 }: UserProfileProps) => {
  return (
    <>
      <Link to='/profile'>
        <div className='d-flex'>
          <div className='profileImageContainer'>
            <img
              className='profileImg'
              src={user?.imageUrl.toString()}
              width={imageSize}
              height={imageSize}
              alt='profile'
            />
          </div>
          <div className='d-flex flex-column justify-content-center'>
            <div className='profileName'>{user?.name || user?.username}</div>
            <div className='userName'> @{user?.username}</div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProfileCard;
