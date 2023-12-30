import { useAuth } from '@/Components/Contexts/AuthContext';

import React, { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';

import { useDropzone } from 'react-dropzone';







const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box',
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
};












export default function UploadableProfilePicture({ onClick, className, isUploadable }) {

  const { user, fetchUserData } = useAuth();

  useEffect(() => {
    // Fetch user data on component mount
    fetchUserData();
  }, []);










  const [userProfileImage, setUserProfileImage] = useState(null);  
  const [isLoading, setIsLoading] = useState(true);  
  const [lastUpdateTimestamp, setLastUpdateTimestamp] = useState(0);
  const [totalImages, setTotalImages] = useState(12);  
  const [files, setFiles] = useState([]);
 

  useEffect(() => {
 
    axios.get(route('profile.get-image'))
      .then((response) => {
        const { imageUrl, lastUpdateTimestamp, imagesCount } = response.data;
        // const userImageUrl = imageUrl + user.id + '/avatars/' + user.profile_image;
 
        setUserProfileImage(imageUrl !== false ? imageUrl : null);
        setLastUpdateTimestamp(lastUpdateTimestamp);
        setTotalImages(imagesCount || 12); // Use the count from the server or fallback to 12
        setIsLoading(false); // Set loading to false after fetching data
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false); // Set loading to false on error
      });

  }, []);
 



  useEffect(() => {
    const intervalId = setInterval(() => {
      // Update the storedImageIndex every 6 hours
      localStorage.setItem('imageIndex', generateRandomIndex());
      setLastUpdateTimestamp(Date.now());
    }, 6 * 60 * 60 * 1000); // 6 hours in milliseconds

    return () => clearInterval(intervalId);
  }, []);





  const generateRandomIndex = () => {
    return Math.floor(Math.random() * totalImages) + 1;
  };
 
  // Check if there is a stored image index, if not, generate a new one
  let storedImageIndex = localStorage.getItem('imageIndex');
  if (!storedImageIndex) {
    storedImageIndex = generateRandomIndex();
    localStorage.setItem('imageIndex', storedImageIndex);
  }




  // Set the image URL based on the stored or generated index
  const defaultImageUrl = `/images/profile_images/profile_image_${storedImageIndex}.svg`;


  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file),
      })));
      
      // Automatically save the image when a new file is uploaded
      handleImageUpload(acceptedFiles[0]);
    },
  });

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after the image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview); }}
        />
      </div>
    </div>
  ));

  const imageUrls = files.map(file => file.preview);

  useEffect(() => {
    // Make sure to revoke the data URIs to avoid memory leaks; will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  // Store the imageUrl in a variable to use in both conditions
  const commonImageUrl = imageUrls.length > 0 ? imageUrls[0] : defaultImageUrl;
  const profileImageUrl = userProfileImage || commonImageUrl;

  const handleImageUpload = async (uploadedFile) => {
    if (uploadedFile) {
      const formData = new FormData();
      formData.append('profileImage', uploadedFile);
 
      try {
        // Send the image to the server and update the database
        const response = await axios.post(route('profile.upload-image'), formData, {
          method: 'POST',
          body: formData,
        });
        setUserProfileImage(response.data.imageUrl);
        const event = new CustomEvent('updateUserData');
        window.dispatchEvent(event);
 
      } catch (error) {
        console.log(error);
      }
    }
  };

  const rootProps = isUploadable ? getRootProps() : {};
  

  useEffect(() => {
    // Continue with the rest of your component logic using 'user'
    if (user === null) {
      // User data is still being fetched, show a loading state or return null
      console.log("Loading...");
    } else {

      // ... rest of your component code ...
    }
  }, [user]);







 

  return (
 
      <div
        className={`${className} w-full h-full rounded-full border-4 border-solid ${imageUrls.length > 0 ? 'has-image' : ''} ${isUploadable ? 'uploadable-avatar' : ''}`}
        {...rootProps}
        style={{
          backgroundImage: `url(${profileImageUrl})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'white',
        }}
      >
        {isUploadable ? (
          <div className='avatar-overlay'>
            <p className='text-white text-center text-sm font-semibold m-auto w-[75%] hidden'>Drag 'n' drop some files here, or click to select files</p>
            <div {...getRootProps()} className={`dropzone uploaded-state ${imageUrls.length > 0 ? 'has-image' : ''}`}>
              <input {...getInputProps()} />
            </div>
          </div>
        ): null }

      </div>
 
  );
  



}


