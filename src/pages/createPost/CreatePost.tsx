import FileUploader from '@/components/fileUploader/FileUploader';
import { useUserContext } from '@/context/AuthContext';
import { ICreatePost } from '@/types';
import { createPostApi } from '@/utils/appwrite/postApi';
import intl from '@/utils/locales/en.json';
import { zodResolver } from '@hookform/resolvers/zod';
import { Models } from 'appwrite';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { z } from 'zod';
import './createPost.scss';

const postSchema = z.object({
  caption: z.string(),
  file: z.custom<File[]>(),
  tags: z.string(),
  location: z.string(),
});

type PostFormProps = {
  post?: Models.Document;
  action?: 'Create' | 'Update';
};

const CreatePost = ({ post }: PostFormProps) => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const form = useForm<ICreatePost>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      caption: post ? post?.caption : '',
      file: [],
      location: post ? post.location : '',
      tags: post ? post.tags.join(',') : '',
    },
  });
  const onSubmit: SubmitHandler<ICreatePost> = async (data: ICreatePost) => {
    console.log('data: ', data);
    await createPostApi({
      ...data,
      user: user.id,
    });

    navigate('/');
  };
  return (
    <>
      <FormProvider {...form}>
        <h5>{intl.createPost}</h5>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='mt-4'>
            <label htmlFor='caption'>{intl.caption}</label>
            <textarea
              {...form.register('caption')}
              id='caption'
              className='postInput form-control mt-1'
            ></textarea>
          </div>
          <div className='mt-4'>
            <label htmlFor='photosUpload'>{intl.photos}</label>
            <div className='mt-1'>
              <FileUploader name='file' />
            </div>
          </div>
          <div className='mt-4'>
            <label htmlFor='tags'>{intl.tags}</label>
            <input {...form.register('tags')} id='tags' className='form-control mt-1'></input>
          </div>
          <div className='mt-4'>
            <label htmlFor='location'>{intl.location}</label>
            <input
              type='text'
              {...form.register('location')}
              id='location'
              className='form-control mt-1'
            ></input>
          </div>
          <div className='mt-4'>
            <button
              type='submit'
              disabled={form.formState.isSubmitting}
              className='btn btn-primary w-100'
            >
              {intl.post}
            </button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default CreatePost;
