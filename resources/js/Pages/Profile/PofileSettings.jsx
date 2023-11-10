// ProfileSettings.jsx
import React from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

import { imageUrl } from '@/Components/System/BannerImage';
import ProfilePicture from '@/Components/Profile/ProfilePicture';
import PersonalInfo from '@/Components/Profile/PersonalInfo';
import PrimaryButton from '@/Components/Buttons/PrimaryButton';
import CompanyInfo from '@/Components/Profile/CompanyInfo';

function ProfileSettings({ mustVerifyEmail, status, auth, saved }) {

  const [processing, setProcessing] = useState(false);

  const [personalInfo, setPersonalInfo] = useState({
    first_name: '',
    last_name: '',
    middle_initial: '',
    tel: '',
    street_address: '',
    city: '',
    state: '',
    zip_code: '',
});
 
useEffect(() => {
  // Update state when auth data is available
  if (auth) {
    setPersonalInfo({
      first_name: auth.first_name || '',
      last_name: auth.last_name || '',
      middle_initial: auth.middle_initial || '',
      tel: auth.phone.tel || '',
      street_address: auth.address.street_address || '',
      city: auth.address.city || '',
      state: auth.address.state || '',
      zip_code: auth.address.zip_code || '',
    });
  }
}, [auth]);  

const [companyInfo, setCompanyInfo] = useState({
    company_name: '',
    ein_number: '',
    job_title: '',
    number_of_employees: '',
    referral: '',
});

useEffect(() => {
  // Update state when auth data is available
  if (auth) {
    setCompanyInfo({
      company_name: auth.production_company.company_name || '',
      ein_number: auth.production_company.ein_number || '',
      job_title: auth.production_company.job_title || '',
      number_of_employees: auth.production_company.number_of_employees || '',
      referral: auth.production_company.referral || '',
    });
  }
}, [auth]);  

const submit = async (e) => {
  e.preventDefault();

  // Set processing to true while the form is being submitted
  setProcessing(true);

  try {
     
    // Log personalInfo and companyInfo for tracking
    await axios.patch(route('profile.update'), {
      personalInfo,
      companyInfo,
    });

     // Additional logic after successful submission
  } catch (error) {
     // Handle errors if needed
  } finally {
    // Set processing back to false regardless of success or failure
    setProcessing(false);
  }
};

  return (
    <div >
        <div className='relative mb-1'>
            <div className="w-full h-[8rem] relative" style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover' }}>
                {/* <h3 className='absolute top-[1rem] left-[1rem] text-white z-10'>Profile Settings</h3> */}
                <div className='absolute bg-black h-full w-full opacity-[.5] p-[1rem] z-0'></div>
            </div>
            <ProfilePicture isUploadable={true} className="!h-[10rem] !w-[10rem] ml-6 absolute top-[1.5rem]"/>
        </div>
        {/* Form */}
        <div className='py-6 px-8 w-full flex flex-row gap-6 justify-end'>
            <div className='w-[30%]'>
                
            </div>
            <form onSubmit={submit} className='w-full' >
              <div className='mb-8'>
                <h3 className='mb-4'>Personal Profile</h3>
                <PersonalInfo onUpdatePersonalInfo={setPersonalInfo} existingData={personalInfo}/>
              </div>
              <div className='mb-8'>
                <h3 className='mb-4'>Company Profile</h3>
                <CompanyInfo onUpdateCompanyInfo={setCompanyInfo} existingData={companyInfo} />
              </div>
              
                <PrimaryButton className="float-right" disabled={processing} onClick={saved}>Save Profile Settings</PrimaryButton>
            </form>
        </div>
    </div>
  );
}

export default ProfileSettings;
