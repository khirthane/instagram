import Header from './Header';
import LeftNavigation from './LeftNavigation';
import PageContainer from './PageContainer';

const RootLayout = () => {
  return (
    <>
      <Header />
      <div className='pageContainer'>
        <div className='headerContainer'>
          <LeftNavigation />
        </div>
        <div className='pageContainer'>
          <PageContainer />
        </div>
      </div>
    </>
  );
};

export default RootLayout;
