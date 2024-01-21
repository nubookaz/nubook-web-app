import { useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { fetchGeocodeData } from '@/Components/UtilityFunctions/Geocoding';
import Address from '@/Components/Forms/Address';

import Input from '@/Components/Forms/Input';
import Tooltip from '@mui/joy/Tooltip';




export default function PersonalInfo({ 
    
    onUpdateInfo, 
    emptyFields,
    setEmptyFields,
    data,

}) {

    const [personalData, setPersonalData] = useState({
        first_name: '',
        last_name: '',
        middle_initial: '',
        tel: '',
    });
 
    const [addressData, setAddressData] = useState({
        street_address: '',
        city: '',
        state: '',
        zip_code: '',
    });

    const [geocodeData, setGeocodeData] = useState({
        latitude: '',
        longitude: '',
    });

    useEffect(() => {
        if (data) {
            setPersonalData({
                first_name: data.first_name || '',
                last_name: data.last_name || '',
                middle_initial: data.middle_initial || '',
                tel: data.tel || '',
            });
            setAddressData({
                street_address: data.street_address || '',
                city: data.city || '',
                state: data.state || '',
                zip_code: data.zip_code || '',
            });
            setGeocodeData({
                latitude: data.latitude || '',
                longitude: data.longitude || '',
            });
        }
    }, [data]);



    useEffect(() => {
        const handleGeocode = async () => {
            try {
                if (addressData.street_address && addressData.zip_code) {
                    const geoData = await fetchGeocodeData(addressData.street_address, addressData.zip_code);
                    
                    if (geoData) {
                        const newGeocodeData = {
                            latitude: geoData.lat,
                            longitude: geoData.lng
                        };
        
                        // Update geocode data state
                        setGeocodeData(newGeocodeData);

                        // If needed, call onUpdateInfo here with the updated geocode data
                        onUpdateInfo({
                            ...personalData,
                            ...addressData,
                            ...newGeocodeData
                        });
                    }
                }
            } catch (err) {
                // setError(err.message);
                setGeocodeData({ latitude: '', longitude: '' });
            }
        };
    
        handleGeocode();
    
    }, [addressData.street_address, addressData.zip_code]);
    
 
    
    
    const handleChange = (field, value) => {

        if (field in personalData) {
            setPersonalData(prevPersonalData => ({
                ...prevPersonalData,
                [field]: value,
            }));
        } else if (field in addressData) {
            setAddressData(prevAddressData => ({
                ...prevAddressData,
                [field]: value,
            }));
        } else if (field in geocodeData) {
            setGeocodeData(prevGeocodeData => ({
                ...prevGeocodeData,
                [field]: value,
            }));
        }
 
        onUpdateInfo({
            ...personalData,
            ...addressData,
            ...geocodeData
        });

    };
    
    const handleUpdateAddressData = (field, value) => {
 
        setAddressData(prevAddressData => ({
            ...prevAddressData,
            [field]: value,
        }));
    };
    
 
    const formatPhoneNumber = (value) => {
        const cleanedValue = value.replace(/\D/g, '');
        const formattedValue = `(${cleanedValue.slice(0, 3)}) ${cleanedValue.slice(3, 6)}-${cleanedValue.slice(6, 10)}`;
        return formattedValue;
    };

    // console.log(existingData);

    return (
        <div className='flex flex-col gap-4 grow'>
             
            <div className='flex flex-row gap-2 w-full'>
                <div className='flex flex-col gap-2 w-full'>
                    <label htmlFor="first_name" className='text-gray-400 text-sm'> First Name * </label>
                    <Tooltip arrow sx={{ fontSize: '.75rem' }} title="First Name is Required" open={emptyFields['first_name'] || false} color="danger" placement="top" variant="outlined">
                        <input 
                            required
                            title="First Name"
                            type="text"
                            name="first_name"
                            placeholder="Daniel"
                            value={personalData.first_name}
                            autoComplete="given-name"
                            onChange={(e) => handleChange('first_name', e.target.value)}
                        />
                    </Tooltip>
                </div>

               
                <Input 
                    required={false}
                    title="M.I."
                    label="M.I."
                    type="text"
                    name="middle_initial"
                    placeholder="D.W"
                    value={personalData.middle_initial}
                    autoComplete="additional-name"
                    parentClass="!w-[8rem]"
                    openToolTip={false}
                    onChange={(e) => handleChange('middle_initial', e.target.value)}
                />

                <div className='flex flex-col gap-2 w-full'>
                    <label htmlFor="last_name" className='text-gray-400 text-sm'> Last Name * </label>
                    <Tooltip arrow sx={{ fontSize: '.75rem' }} title="Last Name is Required" open={emptyFields['last_name'] || false} color="danger" placement="top" variant="outlined">
                        <input 
                            required
                            title="Last Name"
                            type="text"
                            name="last_name"
                            placeholder="Lewis"
                            value={personalData.last_name}
                            autoComplete="family-name"
                            onChange={(e) => handleChange('last_name', e.target.value)}
                        />
                    </Tooltip>
                </div>
            </div>
    
            <div className='flex flex-col gap-2 w-full '>
                <label htmlFor="tel" value="tel" className='text-gray-400 text-sm'> Phone Number </label>
                <input
                    type="tel"
                    id="tel"
                    name="tel"
                    placeholder="(123) 456-7890"
                    value={personalData.tel ? formatPhoneNumber(personalData.tel) : ''}
                    autoComplete="tel"
                    onChange={(e) => handleChange('tel', e.target.value)}
                /> 
            </div>

            <Address
                data={addressData}
                onAddressChange={handleUpdateAddressData}
            />
        </div> 
    );
    

}
