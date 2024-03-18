import { useAuth } from '@/Components/Contexts/AuthContext';
import React from 'react';
import PortalLayout from '@/Layouts/Partials/PortalLayout';


import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

import UploadableProfilePicture from '@/Pages/Profile/Partials/UploadableProfilePicture';
import PersonalInfo from '@/Pages/Profile/Forms/PersonalInfo';
import CompanyInfo from '@/Pages/Profile/Forms/CompanyInfo';


import CardContainer from '@/Components/Containers/CardContainer';





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
                    <div className='w-full flex flex-row gap-6 h-full'>
                        <div className='flex flex-col gap-6 w-full h-full'>
                          <CardContainer header='Profile Settings'>
                              <div className='flex flex-row gap-10'>
                                <UploadableProfilePicture isUploadable={true} className="!h-[10rem] !w-[10rem] border-red-500"/>
                                <PersonalInfo onUpdateInfo={setPersonalInfo} existingData={personalInfo} emptyFields={emptyFields} setEmptyFields={setEmptyFields}/>
                              </div>
                          </CardContainer>
                          <CardContainer header='Account Settings' className='h-full'>

                          </CardContainer>
                        </div>
                        
                        <div className='flex flex-col gap-6 w-full max-w-[40rem] h-full'>
                          <CardContainer header='Production Company'>
                            <CompanyInfo onUpdateInfo={setCompanyInfo} existingData={companyInfo} />
                          </CardContainer>
                          <CardContainer header='Subscription Info' className='h-full'>

                          </CardContainer>
                        </div>

    
                   </div>

                </>
                
              ),
          }}

      </PortalLayout>

  );
}

export default ProfileSettings;
