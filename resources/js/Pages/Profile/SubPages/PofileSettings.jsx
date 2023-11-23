import { useAuth } from '@/Components/Contexts/AuthContext';
import React from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

import { imageUrl } from '@/Components/Scripts/BannerImage';
import ProfilePicture from '@/Components/Profile/ProfilePicture';
import PersonalInfo from '@/Pages/Profile/Forms/PersonalInfo';
import PrimaryButton from '@/Components/Buttons/PrimaryButton';
import CompanyInfo from '@/Pages/Profile/Forms/CompanyInfo';







function ProfileSettings({ mustVerifyEmail, status, auth, onSave }) {
  const { user, fetchUserData } = useAuth();

  useEffect(() => {
    // Fetch user data on component mount
    fetchUserData();
  }, []);

  const [userData, setUserData] = useState(null);

  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (user && JSON.stringify(user) !== JSON.stringify(userData)) {
      setUserData(user);
  
      setPersonalInfo({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        middle_initial: user.middle_initial || '',
        tel: user.phone ? user.phone.tel || '' : '',
        street_address: user.location ? user.location.street_address || '' : '',
        city: user.location ? user.location.city || '' : '',
        state: user.location ? user.location.state || '' : '',
        zip_code: user.location ? user.location.zip_code || '' : '',
      });
  
      setCompanyInfo({
        company_name: user.production_company ? user.production_company.company_name || '' : '',
        ein_number: user.production_company ? user.production_company.ein_number || '' : '',
        job_title: user.production_company ? user.production_company.job_title || '' : '',
        number_of_employees: user.production_company ? user.production_company.number_of_employees || '' : '',
        referral: user.production_company ? user.production_company.referral || '' : '',
      });
    }
  }, [user, userData]);
  

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

  const [companyInfo, setCompanyInfo] = useState({
    company_name: '',
    ein_number: '',
    job_title: '',
    number_of_employees: '',
    referral: '',
  });



  const submit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
        // Use the state directly from the callback
        await axios.patch(route('profile.update'), {
            personalInfo: personalInfo,
            companyInfo: companyInfo,
        });
        onSave(true);
        const event = new CustomEvent('updateUserData');
        window.dispatchEvent(event);
        // Additional logic after successful submission
    } catch (error) {
        // Handle errors if needed
        console.log(error);

    } finally {
        // Set processing back to false regardless of success or failure
        setProcessing(false);
    }
};
 
 

  return (
    <div >
        <div className='relative mb-1'>
            <div className="w-full h-[8rem] relative" style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                {/* <h3 className='absolute top-[1rem] left-[1rem] text-white z-10'>Profile Settings</h3> */}
                <div className='absolute bg-black h-full w-full opacity-[.5] p-[1rem] z-0'></div>
            </div>
            <ProfilePicture isUploadable={true} className="!h-[10rem] !w-[10rem] ml-6 absolute top-[1.5rem]"/>
        </div>
        {/* Form */}
        <div className='py-6 px-8 w-full flex flex-row gap-6 grow justify-end'>
            <div className='w-[30%] flex grow'>
                
            </div>
            <form onSubmit={submit} className='w-full flex grow flex-col gap-8 ' >
              <div className=''>
                <h3 className='mb-4'>Personal Profile</h3>
                <PersonalInfo onUpdateInfo={setPersonalInfo} onChange={(e) => handleChange('tel', e.target.value)} existingData={personalInfo} />
              </div>
              <div className=''>
                <h3 className='mb-4'>Company Profile</h3>
                <CompanyInfo onUpdateInfo={setCompanyInfo} existingData={companyInfo} />
              </div>
              
                <PrimaryButton className="h-full" disabled={processing}>Save Profile Settings</PrimaryButton>
            </form>
        </div>
    </div>
  );
}

export default ProfileSettings;
