import { useAuth } from '@/Components/Contexts/AuthContext';
import React from 'react';
import PortalLayout from '@/Layouts/Partials/PortalLayout';



import { Link, useForm, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

import { imageUrl } from '@/Components/Scripts/BannerImage';
import UploadableProfilePicture from '@/Pages/Profile/Partials/UploadableProfilePicture';
import PersonalInfo from '@/Pages/Profile/Forms/PersonalInfo';
import PrimaryButton from '@/Components/Buttons/PrimaryButton';
import CompanyInfo from '@/Pages/Profile/Forms/CompanyInfo';







function ProfileSettings({ 
  
   onSave 

}) {
  const { user } = useAuth();







  const [emptyFields, setEmptyFields] = useState({});
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

  const [companyInfo, setCompanyInfo] = useState({
    company_name: '',
    ein_number: '',
    job_title: '',
    number_of_employees: '',
    referral: '',
  });


  useEffect(() => {
    if (user) {
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
        company_name: user.primary_production_company ? user.primary_production_company.company_name || '' : '',
        ein_number: user.primary_production_company ? user.primary_production_company.ein_number || '' : '',
        job_title: user.primary_production_company ? user.primary_production_company.job_title || '' : '',
        number_of_employees: user.primary_production_company ? user.primary_production_company.number_of_employees || '' : '',
        referral: user.primary_production_company ? user.primary_production_company.referral || '' : '',
      });
    }
  }, [user]);

 

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
      <PortalLayout 
          breadcrumbs={[
              { label: 'Profile Settings', url: '' },
          ]}
      >
                  
          {{
              body:(
                <>
                    <div className='py-6 px-8 w-full flex flex-row gap-6 grow justify-center h-full'>
                      <UploadableProfilePicture isUploadable={true} className="!h-[10rem] !w-[10rem] border-red-500"/>

                      {/* <form onSubmit={submit} className='w-full flex grow flex-col gap-8 ' >
                        <div>
                          <h3 className='mb-4'>Personal Profile</h3>
                          <PersonalInfo onUpdateInfo={setPersonalInfo} data={personalInfo} emptyFields={emptyFields} setEmptyFields={setEmptyFields}/>
                        </div>
                        <div>
                          <h3 className='mb-4'>Company Profile</h3>
                          <CompanyInfo onUpdateInfo={setCompanyInfo} existingData={companyInfo} />
                        </div>
                        
                          <PrimaryButton disabled={processing}>Save Profile Settings</PrimaryButton>
                      </form> */}
                   </div>

                </>
                
              ),
          }}

      </PortalLayout>

  );
}

export default ProfileSettings;
