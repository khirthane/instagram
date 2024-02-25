import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <>
      <Link to='/'>
        <img src='/assets/images/logo.png' width={120} />
      </Link>
    </>
  );
};

export default Logo;
