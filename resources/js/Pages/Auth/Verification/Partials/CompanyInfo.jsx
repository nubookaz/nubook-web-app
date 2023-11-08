import { useForm } from '@inertiajs/react';

import Input from '@mui/joy/Input';
import CompanyEIN from '@/Components/Forms/CompanyEIN';




export default function CompanyInfo({ onUpdateCompanyInfo }) {
    const { data, setData } = useForm({
        company_name: '',
        ein_number: '',
        job_title: '',
        number_of_employees: '',
        referral: '',
    });

    const handleChange = (field, value) => {
        setData(field, value);

        // Notify the parent about the updated personal info
        onUpdateCompanyInfo({
            ...data,
            [field]: value,
        });
    };


    return (

        <div>
            <div className='form-group'>   
                <input
                    id="company_name"
                    type="text"
                    name="company_name"
                    placeholder="Company Name"
                    value={data.company_name}
                    onChange={(e) => handleChange('company_name', e.target.value)}
                />

            </div>
            <div className='form-group'>   
                {/* <input
                    id="ein_number"
                    type="text"
                    name="ein_number"
                    placeholder="Ein Number"
                    value={data.ein_number}
                    onChange={(e) => handleChange('ein_number', e.target.value)}
                /> */}
                <CompanyEIN onEINChange={handleChange}/>

            </div>
            <div className='form-group'>   
                <input
                    id="job_title"
                    type="text"
                    name="job_title"
                    placeholder="Job Title"
                    value={data.job_title}
                    onChange={(e) => handleChange('job_title', e.target.value)}
                />
            </div>
            <div className='form-group'>   
                <select
                    id="number_of_employees"
                    name="number_of_employees"
                    value={data.number_of_employees}
                    onChange={(e) => handleChange('number_of_employees', e.target.value)}
                >
                    <option value="">Select Number of Employees</option>
                    <option value="1-10">1-10</option>
                    <option value="11-50">11-50</option>
                    <option value="51-100">51-100</option>
                    <option value="101-500">101-500</option>
                    <option value="500+">500+</option>
                </select>
            </div>
            <div className='form-group'>   
                <select
                    id="referral"
                    name="referral"
                    value={data.referral}
                    onChange={(e) => handleChange('referral', e.target.value)}
                >
                    <option value="">Select Referral Source</option>
                    <option value="Google">Google</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Friend or Colleague">Friend or Colleague</option>
                    <option value="Event or Conference">Event or Conference</option>
                    <option value="Other">Other</option>
                </select>
            </div>
         </div> 

    );

}
