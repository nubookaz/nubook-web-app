import React, { useState, useEffect } from 'react';
import { fetchGeocodeData } from '@/Components/API/Geocoding';

import Tooltip from '@mui/joy/Tooltip';

const Address = ({ data = {}, onAddressChange, emptyFields = {}, setEmptyFields = () => {}  }) => {
    const initialState = {
        street_address: '',
        city: '',
        state: '',
        zip_code: '',
    };

    const [address, setAddress] = useState(initialState);

    useEffect(() => {
        // Update state only if data is provided
        if (Object.keys(data).length > 0) {
            setAddress({
                street_address: data.street_address || '',
                city: data.city || '',
                state: data.state || '',
                zip_code: data.zip_code || '',
            });
        }
    }, [data]);

    const states = [
        "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", 
        "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", 
        "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", 
        "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", 
        "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", 
        "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", 
        "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", 
        "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", 
        "Washington", "West Virginia", "Wisconsin", "Wyoming"
    ];

    const handleInputChange = (field, value) => {
        const updatedAddress = { ...address, [field]: value };
        setAddress(updatedAddress);
        setEmptyFields({ ...emptyFields, [field]: !value });

        if (updatedAddress.street_address && updatedAddress.zip_code) {
            fetchAndUpdateGeocode(updatedAddress);
        }
    };


const fetchAndUpdateGeocode = async (newAddress) => {
    const { street_address, city, state, zip_code } = newAddress;
    try {
        const geoData = await fetchGeocodeData(street_address, zip_code);
        if (geoData) {
            const updatedAddress = {
                ...newAddress,
                latitude: geoData.lat,
                longitude: geoData.lng
            };
            setAddress(updatedAddress);
            onAddressChange(updatedAddress);
        }
    } catch (err) {
        console.error('Error fetching geocode:', err);
    }
};

const renderInputWithTooltip = (field, label, type = 'text', placeholder, autoComplete) => {
    return (
        <div className='flex flex-col gap-2 w-full'>
            <label htmlFor={field} className='text-gray-400 text-sm'>{label}</label>
            <Tooltip 
                title={`${label} is required`} 
                open={!!emptyFields[field]}
                placement="right"
            >
                <input
                    id={field}
                    type={type}
                    value={address[field]}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                />
            </Tooltip>
        </div>
    );
};
 

  return (
    <div className='flex flex-col gap-4 w-full'>
        {renderInputWithTooltip('street_address', 'Street Address', 'text', 'Street Address', 'street-address')}
        <div className='flex flex-row gap-2 w-full'>
            {renderInputWithTooltip('city', 'City', 'text', 'City', 'address-level2')}
            <div className='flex flex-col gap-2 w-full'>
            <label htmlFor="state" className='text-gray-400 text-sm'>State</label>
            <select
                id="state"
                value={address.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                autoComplete="address-level1"
            >
                <option value="">Select a State</option>
                {states.map((state, index) => (
                <option key={index} value={state}>{state}</option>
                ))}
            </select>
            </div>
            {renderInputWithTooltip('zip_code', 'Zip Code', 'text', 'Zip Code', 'postal-code')}
        </div>
    </div>
  );
};

 

export default Address;