const Loader = ({ size = 30 }) => {
  return (
    <span className='d-flex justify-content-center'>
      <img src='/assets/images/loading-spinner-final.svg' width={size} />
    </span>
  );
};

export default Loader;
