import { useUserContext } from '@/context/AuthContext';
import { Navigate, Outlet } from 'react-router';
import './appLaunch.scss';

const AppLaunch = () => {
  const { isAuthenticated } = useUserContext();

  return (
    <>
      {isAuthenticated ? (
        <Navigate to='/' />
      ) : (
        <>
          <div className='launchContainer d-flex'>
            <section className='col-md-12 col-lg-6'>
              <Outlet />
            </section>
            <div className='launchBg col-lg-6 d-none d-lg-block'>
              <img className='launchBgImg' src='/assets/images/bg.jpg' />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AppLaunch;
