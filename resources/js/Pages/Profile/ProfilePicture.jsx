import { useAuth } from '@/Components/Contexts/AuthContext';

import React, { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';

import { Link } from '@inertiajs/react';



export default function ProfilePicture({ 
  
  className,
  href

}) {

  const { userData, latestProfileImageUrl, defaultProfileImageUrl } = useAuth();
 
  const profileImageUrl = latestProfileImageUrl || userData?.profile_image || defaultProfileImageUrl;
  
  return (
 
      <Link
          href={href}
          className={`${className} rounded-full border-2 border-solid border-rose-400`}
          style={{
              backgroundImage: `url(${profileImageUrl})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundColor: 'white',
          }}
      >

      </Link>
 
  );
  



}


