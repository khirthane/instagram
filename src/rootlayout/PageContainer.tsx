import { Outlet } from 'react-router';

const PageContainer = () => {
  return (
    <main className='mainContainer d-flex justify-content-center'>
      <div className='col-lg-6'>
        <Outlet />
      </div>
    </main>
  );
};

export default PageContainer;
