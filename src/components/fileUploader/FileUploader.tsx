import { useCallback, useEffect } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';
import './fileUploader.scss';

type FileUploaderProps = {
  name: string;
};

const FileUploader = ({ name }: FileUploaderProps) => {
  const { register, unregister, setValue, watch } = useFormContext();
  const files = watch(name);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setValue(name, acceptedFiles, { shouldValidate: true });
    },
    [setValue, name],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
  });

  useEffect(() => {
    register(name);
    return () => {
      unregister(name);
    };
  }, [register, unregister, name]);

  const imagePreviewTemplate = files?.map((file: FileWithPath) => (
    <div className='thumb' key={file.name}>
      <img src={URL.createObjectURL(file)} className='img' alt={file.name} />
    </div>
  ));

  return (
    <>
      <div {...getRootProps()} className='fileUploader'>
        <input {...getInputProps()} />
        <div className='uploadContainer'>
          {!files ? (
            <div className='d-flex align-items-center justify-content-center'>
              <p>Drop the files here ...</p>
            </div>
          ) : (
            <div className='d-flex flex-column align-items-center justify-content-center'>
              <img src='/assets/images/upload.svg' alt='File Upload'></img>
              <p>Drag and drop images here, or click to select files</p>
            </div>
          )}
        </div>
        <input type='hidden' {...register('file')} value={JSON.stringify(files)} />
        <div className='uploadedFiles'>{imagePreviewTemplate}</div>
      </div>
    </>
  );
};

export default FileUploader;
