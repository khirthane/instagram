import { useTheme } from '@/components/themeToggle/ThemeContext';
import Header from './Header';
import LeftNavigation from './LeftNavigation';
import PageContainer from './PageContainer';

const RootLayout = () => {
  const { theme } = useTheme();
  return (
    <div className={`app ${theme}`}>
      <Header />
      <div className='pageContainer'>
        <div className='headerContainer'>
          <LeftNavigation />
        </div>
        <section className='pageContainer d-flex flex-fill'>
          <PageContainer />
        </section>
      </div>
    </div>
  );
};

export default RootLayout;
