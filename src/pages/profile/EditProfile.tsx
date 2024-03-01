import intl from '@/utils/locales/en.json';
import { useCurrentUser } from '@/utils/react-query/queries';
import { useNavigate } from 'react-router';
import { z } from 'zod';

const schema = z.object({
  namee: z.string(),
  username: z.string().min(8),
  email: z.string().email(),
  bio: z.string(),
  imageUrl: z.string(),
});

const EditProfile = () => {
  const { data: currentUser } = useCurrentUser();
  const navigate = useNavigate();

  const onBackBtnClick = () => {
    navigate('/profile');
  };

  return (
    <>
      <div className='d-flex w-100'>
        <button onClick={onBackBtnClick} className='btn-icon'>
          <img src='/assets/images/backBtn.svg' width={30} />
        </button>
        <h4 className='d-flex justify-content-center w-100'>{intl.editProfile}</h4>
      </div>
      <div className='card'></div>
    </>
  );
};

export default EditProfile;
