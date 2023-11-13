import { useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';

import { formClass, formGroupClass, inputGroupClass, twoColInputGroupClass } from '@/Components/Scripts/Form';

import UserName from '@/Components/Profile/Partials/UserName';


export default function PersonalInfo({ onUpdatePersonalInfo, existingData }) {
    
    const [data, setData] = useState({
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
        if (existingData) {
            setData(existingData);
        }
    }, [existingData]);

    const handleChange = (field, value) => {
        setData((prevData) => ({
          ...prevData,
          [field]: value,
        }));
        onUpdatePersonalInfo({
            ...data,
            [field]: value,
        });
      };

 
    const formatPhoneNumber = (value) => {
        const cleanedValue = value.replace(/\D/g, '');
        const formattedValue = `(${cleanedValue.slice(0, 3)}) ${cleanedValue.slice(3, 6)}-${cleanedValue.slice(6, 10)}`;
        return formattedValue;
    };

    return (

        <div className='flex flex-col gap-4 grow'>
            {/* <UserName onUpdateUserInfo={setData} existingData={data}/> */}
            
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

            <div className='flex flex-col gap-2 w-full '>
                <label htmlFor="tel" value="tel" className='text-gray-400 text-sm'> Phone Number </label>
                <input
                    type="tel"
                    id="tel"
                    name="tel"
                    placeholder="(123) 456-7890"
                    value={data.tel ? formatPhoneNumber(data.tel) : ''}
                    autoComplete="tel"
                    onChange={(e) => handleChange('tel', e.target.value)}
                /> 
            </div>
        
            <div className='flex flex-col gap-4 w-full'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="street_address" value="street_address" className='text-gray-400 text-sm'> Street Address </label>
                    <input
                        type="text"
                        id="street_address"
                        name="street_address"
                        placeholder="1234 Chuckleberry Lane"
                        value={data.street_address}
                        autoComplete="street-address"
                        onChange={(e) => handleChange('street_address', e.target.value)}
                    />
                </div>
                <div className='flex flex-row gap-2'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="city" value="city" className='text-gray-400 text-sm'> City </label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            placeholder="Giggletown"
                            value={data.city}
                            autoComplete="address-level2"
                            onChange={(e) => handleChange('city', e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="state" value="state" className='text-gray-400 text-sm'> State </label>
                        <input
                            type="text"
                            id="state"
                            name="state"
                            placeholder="Whimsicalandia"
                            value={data.state}
                            autoComplete="address-level1"
                            onChange={(e) => handleChange('state', e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col gap-2 grow'>
                        <label htmlFor="zip_code" value="zip_code" className='text-gray-400 text-sm'> Zip Code </label>
                        <input
                            type="text"
                            id="zip_code"
                            name="zip_code"
                            placeholder="65904"
                            value={data.zip_code}
                            autoComplete="postal-code"
                            onChange={(e) => handleChange('zip_code', e.target.value)}
                        />
                    </div>
                </div>
               
            </div>                
        </div> 

    );

}
