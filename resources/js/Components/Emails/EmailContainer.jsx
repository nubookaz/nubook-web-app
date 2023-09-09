import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

import ApplicationName from '@/Components/Branding/ApplicationName';

function EmailContainer({children}) {
  return (
    <div className='email-container overflow-hidden flex flex-col h-full max-w-[58rem] mx-auto'>
      <div className='browser-header flex flex-row gap-2 bg-slate-500 py-2 px-4'>
          <FontAwesomeIcon icon={faCircle} className='text-sm text-red-600'/>
          <FontAwesomeIcon icon={faCircle} className='text-sm text-yellow-300'/>
          <FontAwesomeIcon icon={faCircle} className='text-sm text-green-600'/>
      </div>
      <div className='py-2 px-4 bg-slate-100'>
        <p className='text-sm secondary-color'>Call Time - 6:00AM - Call Sheet for “Girl on Wave 2”</p>
      </div>
      <div className='py-2 px-4 bg-white'>
        <p className='text-sm secondary-color'>Bob Anderson info@bobanderson.com</p>
      </div>
      <div className='py-8 px-24 bg-slate-300 h-full flex flex-col'>
        <ApplicationName className="text-center mb-6"/>
        {children}
      </div>

    </div>
  );
}

export default EmailContainer;
