import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './AvatarUploader.scss';

type AvatarUploaderProps = {
  defaultPic?: string;
  onPictureChange: (file: File) => void;
};

const AvatarUploader = ({ defaultPic, onPictureChange }: AvatarUploaderProps) => {
  const [profilePic, setProfilePic] = useState<File | null | undefined>(
    defaultPic ? null : undefined,
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]; // Assuming only one file is uploaded
      setProfilePic(file);
      onPictureChange(file); // Send the selected picture back to the parent component
    },
    [onPictureChange],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    }, // Accept only image files
    maxFiles: 1, // Allow only one file to be uploaded
  });

  const handleClick = () => {
    document.getElementById('fileInput')?.click();
  };

  return (
    <>
      <div {...getRootProps()} onClick={handleClick}>
        <input {...getInputProps()} id='fileInput' style={{ display: 'none' }} />
        {profilePic && (
          <img
            src={URL.createObjectURL(profilePic)}
            className='avatar'
            width={200}
            alt='Profile Pic'
          />
        )}
      </div>
      {!profilePic && defaultPic && (
        <div onClick={handleClick}>
          <img className='avatar' src={defaultPic} width={200} alt='Default Profile Pic' />
        </div>
      )}
    </>
  );
};

export default AvatarUploader;
