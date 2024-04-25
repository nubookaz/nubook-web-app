import { useAuth } from '@/Components/Contexts/AuthContext';

import React, { useState } from 'react';
import { router } from '@inertiajs/react';

import { useDropzone } from 'react-dropzone';

function ProfileImageUpload() {
  const { userData, uploadProfileImage, defaultProfileImageUrl } = useAuth();
  const [localImage, setLocalImage] = useState(null);

  const handleFile = (file) => {

    if (!['image/jpeg', 'image/png', 'image/svg+xml'].includes(file.type)) {
      alert('Only JPG, JPEG, PNG, and SVG files are allowed.');
      return false;
    }
    setLocalImage(URL.createObjectURL(file));
    uploadProfileImage(file);
    return true;
  };
  
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      handleFile(event.target.files[0]);
    }
  };

const { getRootProps, getInputProps } = useDropzone({
  accept: {
    'image/jpeg': ['.jpeg', '.jpg'],
    'image/png': ['.png'],
    'image/svg+xml': ['.svg']
  },
  onDrop: (acceptedFiles, fileRejections) => {
    if (fileRejections.length > 0) {
      alert('Some files were rejected.');
      return;
    }
    acceptedFiles.forEach(file => handleFile(file));
  },
});

  const imageToShow = localImage || userData?.profile_image || defaultProfileImageUrl;

  return (
    <div className="flex justify-center items-center flex-col">
      <input {...getInputProps()} onChange={onImageChange} className="hidden" />
      <div {...getRootProps()} className="relative w-36 h-36 rounded-full overflow-hidden cursor-pointer border-2 border-rose-400 shadow-md">
        <img src={imageToShow} alt="profile" className="w-full h-full object-cover" />
        <div className="duration-500 absolute inset-0 flex justify-center items-center bg-white bg-opacity-75 opacity-0 hover:opacity-100">
          <span className="text-sm text-slate-800 text-center px-4">Click or drag an image to upload</span>
        </div>
      </div>
    </div>
  );
}

export default ProfileImageUpload;
