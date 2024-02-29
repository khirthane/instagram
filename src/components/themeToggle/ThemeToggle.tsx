import { useTheme } from './ThemeContext';
import './ThemeToggle.scss';

export type ThemeType = 'dark' | 'light';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className='switcher'>
      <input
        type='checkbox'
        checked={theme == 'dark'}
        className='checkbox'
        id='checkbox'
        onChange={toggleTheme}
      />
      <label htmlFor='checkbox' className='checkbox-label'>
        <img src='/assets/images/nightMode.svg' width={14} />
        <img src='/assets/images/lightMode.svg' width={14} />
        <span className='ball'></span>
      </label>
    </div>
  );
};

export default ThemeToggle;
