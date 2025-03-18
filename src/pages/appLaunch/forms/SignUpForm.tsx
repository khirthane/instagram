import { useUserContext } from '@/context/AuthContext';
import Logo from '@/rootlayout/Logo';
import { INewUser } from '@/types';
import intl from '@/utils/locales/en.json';
import { useCreateUserAccount, useSignInAccount } from '@/utils/react-query/queries';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

const schema = z.object({
  username: z.string(),
  password: z.string().min(8),
  email: z.string().email(),
});

const SignUpForm = () => {
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<INewUser>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync: createUserAccount } = useCreateUserAccount();
  const { mutateAsync: signInAccount } = useSignInAccount();

  const onSubmit: SubmitHandler<INewUser> = async (data: INewUser) => {
    console.log(data);

    const newUser = await createUserAccount(data);

    if (!newUser) console.log('Not able to create user, Please try again');

    const session = await signInAccount({
      email: data.email,
      password: data.password,
    });

    if (!session) console.log('Not able to login, Please try again');

    const isLoggedIn = await checkAuthUser();
    if (isLoggedIn) {
      reset();
      navigate('/');
    } else {
      console.log('Not able to login, Please try again');
      return false;
    }
  };

  return (
    <div className='h-100 d-flex flex-column align-items-center justify-content-center'>
      <Logo />
      <div className='col-5'>
        <form className='signUpForm' onSubmit={handleSubmit(onSubmit)}>
          <h3 className='mb-4 d-flex justify-content-center'>{intl.createANewAccount}</h3>
          <div className='row mb-4'>
            <label className='px-0 mb-1' htmlFor='username'>
              {intl.username}
            </label>
            <input type='text' className='form-control' id='username' {...register('username')} />
            {errors.username && <div className='text-danger p-0'>{errors.username.message}</div>}
          </div>
          <div className='row mb-4'>
            <label className='px-0 mb-1' htmlFor='email'>
              {intl.emailId}
            </label>
            <input type='text' className='form-control' id='email' {...register('email')} />
            {errors.email && <div className='text-danger p-0'>{errors.email.message}</div>}
          </div>
          <div className='row mb-4'>
            <label className='px-0 mb-1' htmlFor='password'>
              {intl.password}
            </label>
            <input
              type='password'
              className='form-control'
              id='password'
              {...register('password')}
            />
            {errors.password && <div className='text-danger p-0'>{errors.password.message}</div>}
          </div>

          <div className='row mb-4'>
            <button type='submit' disabled={isSubmitting} className='btn btn-primary'>
              {isUserLoading ? <span>({intl.loading})</span> : <>{intl.signUp}</>}
            </button>
          </div>
          <div className='row'>
            <p className='d-flex justify-content-center'>
              {intl.alreadyHaveAnAccount}
              <span className='ms-2'>
                <Link to='/sign-in'>{intl.signIn}</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
