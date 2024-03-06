import ProfileCard from '@/components/shared/ProfileCard';
import { NavBarLinks } from '@/constants';
import intl from '@/utils/locales/en.json';
import { useCurrentUser, useSignOutAccount } from '@/utils/react-query/queries';
import { useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';

const LeftNavigation = () => {
  const { data: user } = useCurrentUser();
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
        {user && (
          <div className='d-flex justify-content-center'>
            <ProfileCard user={user} imageSize={70} />
          </div>
        )}

        <ul className='d-flex flex-column mt-4'>
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
