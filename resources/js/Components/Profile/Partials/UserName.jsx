import { useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';





export default function UserName({ onUpdateUserInfo, existingData }) {
    const [data, setData] = useState({
        first_name: '',
        last_name: '',
        middle_initial: '',
    });
    useEffect(() => {
        if (existingData) {
            setData(existingData);
        }
    }, [existingData]);

    const handleChange = (field, value) => {
        setData(prevData => ({
            ...prevData,
            [field]: value,
        }));
    
        onUpdateUserInfo(prevData => ({
            ...prevData,
            [field]: value,
        }));
    };
    


    return(
        <div className='flex flex-row gap-2 w-full'>
            <div className='flex flex-col gap-2 grow'>
                <label htmlFor="first_name" value="first_name" className='text-gray-400 text-sm'> First Name * </label>
                <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    placeholder="Daniel"
                    value={data.first_name}
                    autoComplete="given-name"
                    onChange={(e) => handleChange('first_name', e.target.value)}
                    required
                />
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor="middle_initial" value="middle_initial" className='text-gray-400 text-sm'> M.I. </label>
                <input
                    type="text"
                    id="middle_initial"
                    className='max-w-[2.5rem]'
                    name="middle_initial"
                    placeholder="D"
                    value={data.middle_initial}
                    autoComplete="additional-name"
                    maxLength={1} 
                    onChange={(e) => handleChange('middle_initial', e.target.value)}
                />
            </div>
            <div className='flex flex-col gap-2 grow'>
                <label htmlFor="last_name" value="last_name" className='text-gray-400 text-sm'> Last Name * </label>
                <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    placeholder="Lewis"
                    value={data.last_name}
                    autoComplete="family-name"
                    onChange={(e) => handleChange('last_name', e.target.value)}
                    required
                />   
            </div>
        </div>
    );
}

