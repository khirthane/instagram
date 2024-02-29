import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <>
      <Link to='/'>
        <img src='/assets/images/instagram_logo.svg' width={150} />
      </Link>
    </>
  );
};

export default Logo;
