import { useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { fetchGeocodeData } from '@/Components/UtilityFunctions/Geocoding';

import Input from '@/Components/Forms/Input';

export default function PersonalInfo({ 
    
    onUpdateInfo, 
    existingData,
    emptyFields,
    setEmptyFields,

}) {

    const [selectedState, setSelectedState] = useState('');
    const [geoLocationData, setGeoLocationData] = useState(null);

    const [data, setData] = useState({
        first_name: '',
        last_name: '',
        middle_initial: '',
        tel: '',
        street_address: '',
        city: '',
        state: '',
        zip_code: '',
        latitude: '',
        longitude: '',
    });
 

    useEffect(() => {
        // Define the function inside useEffect
        const handleGeocode = async () => {
          try {
            if (data.street_address && data.zip_code) {
              const geoData = await fetchGeocodeData(data.street_address, data.zip_code);
            
              if (geoData) {
                setGeoLocationData(geoData);

                const updatedData = {
                    ...data,
                    latitude: geoData.lat,
                    longitude: geoData.lng
                  };
        
                  setData(updatedData);
        
                  onUpdateInfo(updatedData);
              }

            }
          } catch (err) {
            // setError(err.message);
            setGeoLocationData(null);
          }
        };
    
        // Call the function
        handleGeocode();
    
    }, [data.street_address, data.zip_code]);
    
 

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
        onUpdateInfo({
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
             
            <div className='flex flex-row gap-2 w-full'>
                <Input 
                    required={true}
                    title="First Name"
                    label="First Name"
                    type="text"
                    name="first_name"
                    placeholder="Daniel"
                    value={data.first_name}
                    autoComplete="given-name"
                    parentClass="grow"
                    openToolTip={false}
                    onChange={(e) => handleChange('first_name', e.target.value)}
                />
                {/* <div className='flex flex-col gap-2'> */}
                <Input 
                    required={false}
                    title="M.I."
                    label="M.I."
                    type="text"
                    name="first_name"
                    placeholder="D.W"
                    value={data.middle_initial}
                    autoComplete="additional-name"
                    parentClass="!w-1/2"
                    openToolTip={false}
                    onChange={(e) => handleChange('first_name', e.target.value)}
                />
                <Input 
                    required={true}
                    title="Last Name"
                    label="Last Name"
                    type="text"
                    name="last_name"
                    placeholder="Lewis"
                    value={data.last_name}
                    autoComplete="family-name"
                    parentClass="grow"
                    openToolTip={false}
                    onChange={(e) => handleChange('last_name', e.target.value)}
                />
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


const stateOptions = [
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' },
    { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },
    { value: 'IA', label: 'Iowa' },
    { value: 'KS', label: 'Kansas' },
    { value: 'KY', label: 'Kentucky' },
    { value: 'LA', label: 'Louisiana' },
    { value: 'ME', label: 'Maine' },
    { value: 'MD', label: 'Maryland' },
    { value: 'MA', label: 'Massachusetts' },
    { value: 'MI', label: 'Michigan' },
    { value: 'MN', label: 'Minnesota' },
    { value: 'MS', label: 'Mississippi' },
    { value: 'MO', label: 'Missouri' },
    { value: 'MT', label: 'Montana' },
    { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada' },
    { value: 'NH', label: 'New Hampshire' },
    { value: 'NJ', label: 'New Jersey' },
    { value: 'NM', label: 'New Mexico' },
    { value: 'NY', label: 'New York' },
    { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' },
    { value: 'OH', label: 'Ohio' },
    { value: 'OK', label: 'Oklahoma' },
    { value: 'OR', label: 'Oregon' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' },
    { value: 'SD', label: 'South Dakota' },
    { value: 'TN', label: 'Tennessee' },
    { value: 'TX', label: 'Texas' },
    { value: 'UT', label: 'Utah' },
    { value: 'VT', label: 'Vermont' },
    { value: 'VA', label: 'Virginia' },
    { value: 'WA', label: 'Washington' },
    { value: 'WV', label: 'West Virginia' },
    { value: 'WI', label: 'Wisconsin' },
    { value: 'WY', label: 'Wyoming' }
  ];
  
  