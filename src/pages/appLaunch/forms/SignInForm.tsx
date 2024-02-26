import { useUserContext } from '@/context/AuthContext';
import { ISignInFrom } from '@/types';
import intl from '@/utils/locales/en.json';
import { useSignInAccount } from '@/utils/react-query/queries';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const SignInForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ISignInFrom>({
    resolver: zodResolver(schema),
  });

  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  // Query
  const { mutateAsync: signInAccount } = useSignInAccount();

  const onSubmit: SubmitHandler<ISignInFrom> = async (data) => {
    const session = await signInAccount(data);

    if (!session) {
      console.log('Login failed. Please try again.');

      return;
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      reset();

      navigate('/');
    } else {
      console.log('Login failed. Please try again.');

      return;
    }
  };

  return (
    <div className='h-100 d-flex align-items-center justify-content-center'>
      <form className='signInForm' onSubmit={handleSubmit(onSubmit)}>
        <h3 className='mb-4 d-flex justify-content-center'>{intl.loginToYourAccount}</h3>
        <div className='row mb-4'>
          <label className='px-0 mb-1' htmlFor='email'>
            {intl.emailId}
          </label>
          <input type='text' id='email' className='form-control' {...register('email')} />
          {errors.email && <div className='text-danger p-0'>{errors.email.message}</div>}
        </div>
        <div className='row mb-4'>
          <label className='px-0 mb-1' htmlFor='password'>
            {intl.password}
          </label>
          <input type='password' className='form-control' {...register('password')} />
          {errors.password && <div className='text-danger p-0'>{errors.password.message}</div>}
        </div>
        <div className='row mb-4'>
          <button type='submit' disabled={isSubmitting} className='btn btn-primary w-100'>
            {isUserLoading ? <span>({intl.loading})</span> : <>{intl.signIn}</>}
          </button>
        </div>
        <div className='row'>
          <p className='d-flex justify-content-center'>
            {intl.donthaveAccount}
            <span className='ms-2'>
              <Link to='/sign-up'>{intl.signUp}</Link>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
