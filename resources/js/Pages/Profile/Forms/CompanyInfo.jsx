import { useForm } from '@inertiajs/react';

import CompanyEIN from '@/Components/Forms/CompanyEIN';

import { useEffect } from 'react';



export default function CompanyInfo({ onUpdateInfo, existingData }) {

    const { data, setData } = useForm({
        company_name: '',
        ein_number: '',
        job_title: '',
        number_of_employees: '',
        referral: '',
    });



    useEffect(() => {
        if (existingData) {
            setData(existingData);
        }
    }, [existingData]);

    const handleChange = (field, value) => {
        setData(field, value);

        onUpdateInfo({
            ...data,
            [field]: value,
        });
    };

    const isCompanyInfoRequired = data.company_name !== '';

    return (

        <div className='flex flex-col gap-4'>
            
            <div className='flex flex-row gap-2 w-full'>
                <div className='flex flex-col gap-2 grow'>
                    <label htmlFor="company_name" value="company_name" className='text-gray-400 text-sm'> Company Name </label>

                    <input
                        id="company_name"
                        type="text"
                        name="company_name"
                        placeholder="Apoogle"
                        value={data.company_name}
                        onChange={(e) => handleChange('company_name', e.target.value)}
                    />
                </div>
                <div className='flex flex-col gap-2 w-[15rem]'>
                    <label htmlFor="ein_number" value="ein_number" className='text-gray-400 text-sm'> Company EIN Number {isCompanyInfoRequired ? ('*') : ''}</label>
                    <CompanyEIN onEINChange={handleChange} required={isCompanyInfoRequired} existingData={data}/>
                </div>
            </div>

            <div className='flex flex-col gap-2 grow'>
                <label htmlFor="job_title" value="job_title" className='text-gray-400 text-sm'> Job Title {isCompanyInfoRequired ? ('*') : ''}</label>
                <input
                    id="job_title"
                    type="text"
                    name="job_title"
                    placeholder="Director of Laughter Engineering"
                    value={data.job_title}
                    onChange={(e) => handleChange('job_title', e.target.value)}
                    required={isCompanyInfoRequired}
                />
            </div>

            <div className='flex flex-row gap-2 w-full'>
                <div className='flex flex-col gap-2 w-1/2'>
                    <label htmlFor="number_of_employees" value="number_of_employees" className='text-gray-400 text-sm'> Number  of Employees in Company * </label>
                    <select
                        id="number_of_employees"
                        name="number_of_employees"
                        value={data.number_of_employees}
                        onChange={(e) => handleChange('number_of_employees', e.target.value)}
                        required
                    >
                        <option value="" disabled>Select Number of Employees</option>
                        <option value="1-10">1-10</option>
                        <option value="11-50">11-50</option>
                        <option value="51-100">51-100</option>
                        <option value="101-500">101-500</option>
                        <option value="500+">500+</option>
                    </select>
                </div>

                <div className='flex flex-col gap-2 w-1/2'>
                    <label htmlFor="referral" value="referral" className='text-gray-400 text-sm'> Referral Source *</label>
                    <select
                        id="referral"
                        name="referral"
                        value={data.referral}
                        onChange={(e) => handleChange('referral', e.target.value)}
                        required
                    >
                        <option value="" disabled>Select Referral Source</option>
                        <option value="Google">Google</option>
                        <option value="Social Media">Social Media</option>
                        <option value="Friend or Colleague">Friend or Colleague</option>
                        <option value="Event or Conference">Event or Conference</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>
 
         </div> 

    );

}
