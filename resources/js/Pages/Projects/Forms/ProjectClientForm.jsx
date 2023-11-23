import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { inputGroupClass } from '@/Components/Scripts/Form';

import AutoCompleteList from '@/Components/Clients/AutoCompleteList';
 






function ProjectClientForm({ 
    
    onUpdateCompanyInfo, 
    user, 
    setExistingClient,

}) {
  
    const [newOption, setNewOption] = useState(null);

    const { data, setData } = useForm({
        first_name: '',
        last_name: '',
        middle_initial: '',
        job_title: '',
        email_address: '',
        tel: '',
    });

    const handleChange = (field, value) => {
        setData((prevData) => ({
          ...prevData,
          [field]: value,
        }));
      
        onUpdateCompanyInfo((prevData) => ({
          ...prevData,
          [field]: value,
          company_name: newOption,
        }));
    };

    const handleNewOptionAdded = (newOptionValue) => {
        setNewOption(newOptionValue); 
        onUpdateCompanyInfo((prevData) => ({
            ...prevData,
            company_name: newOptionValue,
        }));

    };


 
    return (
        <div className='new-project-form'>
            <div className='mb-8 form-group'>
                <AutoCompleteList user={user} onNewOptionAdded={handleNewOptionAdded} setExistingClient={setExistingClient} />
            </div>

            {newOption && (      

                <div className='mb-8 form-group'>
                    <h3 className='mb-4 font-semibold primary-color'>Client Contact</h3>
                    <div className='flex flex-row gap-2'>

                        <div className={`grow ${inputGroupClass}`}>
                            <label htmlFor="first_name" value="first_name" className='text-gray-400 text-sm'> First Name </label>
                            <input
                                type="text"
                                placeholder="First Name"
                                name="first_name"
                                value={data.first_name} 
                                onChange={(e) => handleChange('first_name', e.target.value)}
                            />
                        </div>
                        <div className={inputGroupClass}>
                            <label htmlFor="middle_initial" value="middle_initial" className='text-gray-400 text-sm'> Middle Initial </label>
                            <input
                                type="text"
                                placeholder="Middle Initial"
                                name="middle_initial"
                                value={data.middle_initial} 
                                onChange={(e) => handleChange('middle_initial', e.target.value)}
                            />
                        </div>
                        <div className={inputGroupClass}>
                            <label htmlFor="last_name" value="last_name" className='text-gray-400 text-sm'> Last Name </label>
                            <input
                                type="text"
                                sx={{ mb: 2 }}
                                placeholder="Last Name"
                                name="last_name"
                                value={data.last_name} 
                                onChange={(e) => handleChange('last_name', e.target.value)}
                            />
                        </div>

                    </div>

                    <div className={inputGroupClass}>
                        <label htmlFor="job_title" value="job_title" className='text-gray-400 text-sm'> Last Name </label>
                        <input
                            type="text"
                            placeholder="Job Title"
                            name="job_title"
                            value={data.job_title} 
                            onChange={(e) => handleChange('job_title', e.target.value)}
                        />
                    </div>


                    <div className={inputGroupClass}>
                        <label htmlFor="email_address" value="email_address" className='text-gray-400 text-sm'> Email Address </label>
                        <input
                            type="email"
                            sx={{ mb: 2 }}
                            placeholder="Email Address"
                            name="email_address"
                            value={data.email_address} 
                            onChange={(e) => handleChange('email_address', e.target.value)}
                        />
                    </div>

                    <div className={inputGroupClass}>
                        <label htmlFor="tel" value="tel" className='text-gray-400 text-sm'> Phone Number </label>
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            name="tel"
                            value={data.tel} 
                            onChange={(e) => handleChange('tel', e.target.value)}
                        />
                    </div>
                </div>

            )}

        </div>
    );
}

export default ProjectClientForm;
