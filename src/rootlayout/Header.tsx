import { useSignOutAccount } from '@/utils/react-query/queries';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import Logo from './Logo';
import './rootlayout.scss';

const Header = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <section className='header'>
      <div className='d-flex justify-content-start '>
        <Logo />
      </div>
      <div className='d-flex justify-content-end'>
        <button className='btn btn-link' onClick={() => signOut()}>
          Logout
        </button>
      </div>
    </section>
  );
};

export default Header;
