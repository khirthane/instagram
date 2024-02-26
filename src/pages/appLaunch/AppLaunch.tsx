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
          <div className='launchContainer'>
            <div className='d-flex'>
              <section className='launchForm col-lg-6 col-md-12 col'>
                <Outlet />
              </section>
              <section className='launchBg col-lg-6 d-lg-block d-none '>
                <img className='launchBgImg' src='/assets/images/bg.jpg' />
              </section>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AppLaunch;
