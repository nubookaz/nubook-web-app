import React from 'react';
import Input from '@mui/joy/Input';

const LocationForm = ({ location, onLocationChange }) => {
  const defaultLocation = {
    name: '',
    street_address: '',
    city: '',
    state: '',
    zip_code: '',
    country: '',
  };

  const currentLocation = location || defaultLocation;

  return (
    <div>
      <div className='w-full mb-2 input-group'>
        <Input
          type="text"
          name="name"
          defaultValue={currentLocation.name}
          onChange={onLocationChange}
          placeholder="Name"
          autoComplete="off"
        />
      </div>
      <div className='w-full mb-2 input-group'>
        <Input
          type="text"
          name="street_address"
          defaultValue={currentLocation.street_address}
          onChange={onLocationChange}
          placeholder="Street Address"
          autoComplete="off"
        />
      </div>
      <div className='flex flex-row gap-2 mb-2 input-group'>
        <div className='w-full'>
          <Input
            type="text"
            name="city"
            defaultValue={currentLocation.city}
            onChange={onLocationChange}
            placeholder="City"
            autoComplete="off"
          />
        </div>
        <div className='w-[9rem]'>
          <Input
            type="text"
            name="state"
            defaultValue={currentLocation.state}
            onChange={onLocationChange}
            placeholder="State"
            autoComplete="off"
          />
        </div>
        <div className='w-[10rem]'>
          <Input
            type="text"
            name="zip_code"
            defaultValue={currentLocation.zip_code}
            onChange={onLocationChange}
            placeholder="ZIP Code"
            autoComplete="off"
          />
        </div>
      </div>
      <div className='w-full mb-2 input-group'>
        <Input
          type="text"
          name="country"
          defaultValue={currentLocation.country}
          onChange={onLocationChange}
          placeholder="Country"
          autoComplete="off"
        />
      </div>
    </div>
  );
};

export default LocationForm;
