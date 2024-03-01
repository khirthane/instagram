import { NavBarLinks } from '@/constants';
import { useUserContext } from '@/context/AuthContext';
import intl from '@/utils/locales/en.json';
import { useSignOutAccount } from '@/utils/react-query/queries';
import { useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';

const LeftNavigation = () => {
  const { user } = useUserContext();
  const { pathname } = useLocation();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);
  return (
    <>
      <div className='navContainer'>
        <div className='d-flex justify-content-center mb-4'>
          <Logo />
        </div>
        <Link to='/profile'>
          <div className='d-flex flex-row justify-content-center'>
            <div className='profileImage'>
              <img
                className='profileImg'
                src={user.imageUrl ? user.imageUrl : '/assets/profile/profilePic.jpg'}
                alt='profile'
              />
            </div>
            <div className='align-items-center'>
              <div className='profileName'>{user.name || user.username}</div>
              <p className='userName'> @{user.username}</p>
            </div>
          </div>
        </Link>

        <ul className='d-flex flex-column'>
          {NavBarLinks.map((link) => {
            const isActive = pathname === link.route;
            return (
              <li key={link.route} className={`navigationLink ${isActive ? 'isActive' : ''}`}>
                <NavLink to={link.route} className='navLink btn btn-link'>
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      {/* Signout Button */}
      <div className='d-flex flex-column'>
        <div className='navigationBottom navigationLink'>
          <button className='btn btn-link navLink' onClick={() => signOut()}>
            {intl.logout}
          </button>
        </div>
      </div>
    </>
  );
};

export default LeftNavigation;
