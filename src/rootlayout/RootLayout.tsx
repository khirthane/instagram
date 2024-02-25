import Header from './Header';
import LeftNavigation from './LeftNavigation';
import PageContainer from './PageContainer';
import RightContainer from './RightContainer';

const RootLayout = () => {
  return (
    <>
      <Header />
      <div className='pageContainer row'>
        <div className='headerContainer d-none d-md-block d-lg-block'>
          <LeftNavigation />
        </div>
        <div className='pageContainer col-lg-7 col-md-8 offset-lg-2 offset-md-4 col-sm-12'>
          <PageContainer />
        </div>
        <div className='sideContainer d-none d-lg-block'>
          <RightContainer />
        </div>
      </div>
    </>
  );
};

export default RootLayout;
