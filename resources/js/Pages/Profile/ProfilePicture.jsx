import { useAuth } from '@/Components/Contexts/AuthContext';

import React, { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';

import { Link } from '@inertiajs/react';








export default function ProfilePicture({ 
  
  className,
  href

}) {

  const { user } = useAuth();

  const totalImages = 10;

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
  const userProfileImageUrl = user?.profile_image ? `/storage/user1/avatars/${user.profile_image}` : defaultImageUrl;

  return (
 
      <Link
          href={href}
          className={`${className} rounded-full border-2 border-solid border-rose-400`}
          style={{
              backgroundImage: `url(${userProfileImageUrl})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundColor: 'white',
          }}
      >

      </Link>
 
  );
  



}


