import React, { useState, useEffect } from 'react';
import Input from '@/Components/Forms/Input';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Tooltip from '@mui/joy/Tooltip';
import { fetchGeocodeData } from '@/Components/UtilityFunctions/Geocoding';

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



export default function Address ({ 
  
  data, 
  onAddressChange,

}) {

  const [address, setAddress] = useState({
    street_address: '',
    city: '',
    state: '',
    zip_code: '',
    latitude: null,
    longitude: null
  });

  useEffect(() => {
    setAddress({
      street_address: data?.street_address || '',
      city: data?.city || '',
      state: data?.state || '',
      zip_code: data?.zip_code || '',
      latitude: data?.latitude || null,
      longitude: data?.longitude || null
    });
  }, [data]);

  const handleChange = (field, value) => {
    const newAddress = { ...address, [field]: value };
    setAddress(newAddress);
    onAddressChange(newAddress);

    // Check if all address fields are filled before fetching geocode
    if (newAddress.street_address && newAddress.city && newAddress.state && newAddress.zip_code) {
      fetchAndUpdateGeocode(newAddress);
    }
  };

  const fetchAndUpdateGeocode = async (newAddress) => {
    const { street_address, city, state, zip_code } = newAddress;
    try {
      const geoData = await fetchGeocodeData(street_address, city, state, zip_code);
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

  console.log(address);


  return (
    <div className='flex flex-col gap-2'>
      <Input
        openToolTip={false}
        label="Street Address"
        type="text"
        name="street_address"
        value={address.street_address}
        placeholder="3526 W Goapple St"
        onChange={(e) => handleChange('street_address', e.target.value)}  
      />

      <div className='flex flex-row gap-4'>
        <Input
          openToolTip={false}
          label="City"
          type="text"
          name="city"
          value={address.city}
          placeholder="San Francisco"
          onChange={(e) => handleChange('city', e.target.value)}
        />

        <div className='flex flex-col gap-2 w-full'>
          <label htmlFor="state" className='text-gray-400 text-sm'> State</label>
            <Select
              name="state"
              placeholder="Select a State"
              value={address.state}
              onChange={(e, newValue) => handleChange('state', newValue)}
              autoComplete='state'
            >
              {stateOptions.map((option, index) => (
                <Option key={index} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
         </div>

        <Input
          openToolTip={false}
          label="Zip Code"
          type="text"
          name="zip_code"
          value={address.zip_code}
          placeholder="95026"
          onChange={(e) => handleChange('zip_code', e.target.value)}
        />
      </div>
    </div>
  );
}
 
