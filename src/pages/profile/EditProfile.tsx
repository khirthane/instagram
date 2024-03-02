import AvatarUploader from '@/components/avatarUploader/AvatarUploader';
import { IUser } from '@/types';
import intl from '@/utils/locales/en.json';
import { useCurrentUser, useUpdateUser } from '@/utils/react-query/queries';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { z } from 'zod';

const schema = z.object({
  name: z.string(),
  username: z.string().min(8),
  email: z.string().email(),
  bio: z.string(),
  imageUrl: z.string(),
  contactNo: z.string(),
});

const EditProfile = () => {
  const { data: currentUser } = useCurrentUser();

  const [avatar, setAvatar] = useState<File>();
  const navigate = useNavigate();

  const onBackBtnClick = () => {
    navigate('/profile');
  };

  const form = useForm<IUser>({
    resolver: zodResolver(schema),
  });

  const { mutate: updateUser, isPending } = useUpdateUser();

  const onSubmit: SubmitHandler<IUser> = async (data: IUser) => {
    updateUser({ user: data, userId: currentUser?.$id as string, image: avatar });
  };

  const handlePictureChange = async (data: File) => {
    console.log('Uploaded Avatar', data);
    setAvatar(data);
  };

  // Set default values from currentUser if it exists
  useEffect(() => {
    if (currentUser) {
      Object.entries(currentUser).forEach(([key, value]) => {
        form.setValue(key as keyof IUser, value);
      });
    }
  }, [currentUser, form.setValue]);

  return (
    <>
      <div className='d-flex w-100'>
        <button onClick={onBackBtnClick} className='btn-icon'>
          <img src='/assets/images/backBtn.svg' width={30} />
        </button>
        <h4 className='d-flex justify-content-center w-100'>{intl.editProfile}</h4>
      </div>
      <FormProvider {...form}>
        <form className='signInForm w-100' onSubmit={form.handleSubmit(onSubmit)}>
          <div className='card'>
            <div className='d-flex gap-6'>
              <div className='col-3 d-flex mt-4 justify-content-center'>
                <AvatarUploader
                  defaultPic={currentUser?.imageUrl.toString()}
                  onPictureChange={handlePictureChange}
                />
              </div>
              <div className='col-4'>
                <div className='mb-4'>
                  <label className='px-0 mb-1' htmlFor='email'>
                    {intl.email}
                  </label>
                  <input
                    type='text'
                    id='email'
                    className='form-control'
                    {...form.register('email')}
                    disabled
                  />
                  {form.formState.errors.email && (
                    <div className='text-danger p-0'>{form.formState.errors.email.message}</div>
                  )}
                </div>
                <div className='mb-4'>
                  <label className='px-0 mb-1' htmlFor='username'>
                    {intl.username}
                  </label>
                  <input type='text' className='form-control' {...form.register('username')} />
                  {form.formState.errors.username && (
                    <div className='text-danger p-0'>{form.formState.errors.username.message}</div>
                  )}
                </div>
                <div className='mb-4'>
                  <label className='px-0 mb-1' htmlFor='name'>
                    {intl.name}
                  </label>
                  <input type='text' className='form-control' {...form.register('name')} />
                  {form.formState.errors.name && (
                    <div className='text-danger p-0'>{form.formState.errors.name.message}</div>
                  )}
                </div>
                <div className='mb-4'>
                  <label className='px-0 mb-1' htmlFor='contactNo'>
                    {intl.contactNo}
                  </label>
                  <input type='text' className='form-control' {...form.register('contactNo')} />
                  {form.formState.errors.contactNo && (
                    <div className='text-danger p-0'>{form.formState.errors.contactNo.message}</div>
                  )}
                </div>
                <div className='mb-4'>
                  <label className='px-0 mb-1' htmlFor='bio'>
                    {intl.bio}
                  </label>
                  <textarea className='form-control' {...form.register('bio')} />
                  {form.formState.errors.bio && (
                    <div className='text-danger p-0'>{form.formState.errors.bio.message}</div>
                  )}
                </div>
              </div>
            </div>

            <div className='col-offset-5 d-flex justify-content-end'>
              <button type='submit' disabled={isPending} className='btn btn-primary'>
                {isPending ? <>({intl.loading})</> : <>{intl.editProfile}</>}
              </button>
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default EditProfile;
