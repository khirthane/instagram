import { Outlet } from 'react-router';
import RightContainer from './RightContainer';

const PageContainer = () => {
  return (
    <main className='d-flex'>
      <div className='mainContainer'>
        <Outlet />
      </div>

      <div className='sideContainer'>
        <RightContainer />
      </div>
    </main>
  );
};

export default PageContainer;
