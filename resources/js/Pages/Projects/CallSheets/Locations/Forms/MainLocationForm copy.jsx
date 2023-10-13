import React from 'react';
import Input from '@mui/joy/Input';

const MainLocationForm = ({ mainLocation, onMainLocationChange }) => {
  const defaultMainLocation = {
    name: '',
    street_address: '',
    city: '',
    state: '',
    zip_code: '',
    country: '',
  };

  const currentMainLocation = mainLocation || defaultMainLocation;

  return (
    <div>
      <div className='w-full mb-2 input-group'>
        <Input
          type="text"
          name="name"
          value={currentMainLocation.name}
          onChange={onMainLocationChange}
          placeholder="Name"
        />
      </div>
      <div className='w-full mb-2 input-group'>
        <Input
          type="text"
          name="street_address"
          value={currentMainLocation.street_address}
          onChange={onMainLocationChange}
          placeholder="Street Address"
        />
      </div>
      <div className='flex flex-row gap-2 mb-2 input-group'>
        <div className='w-full'>
          <Input
            type="text"
            name="city"
            value={currentMainLocation.city}
            onChange={onMainLocationChange}
            placeholder="City"
          />
        </div>
        <div className='w-[9rem]'>
          <Input
            type="text"
            name="state"
            value={currentMainLocation.state}
            onChange={onMainLocationChange}
            placeholder="State"
          />
        </div>
        <div className='w-[10rem]'>
          <Input
            type="text"
            name="zip_code"
            value={currentMainLocation.zip_code}
            onChange={onMainLocationChange}
            placeholder="ZIP Code"
          />
        </div>
      </div>
      <div className='w-full mb-2 input-group'>
        <Input
          type="text"
          name="country"
          value={currentMainLocation.country}
          onChange={onMainLocationChange}
          placeholder="Country"
        />
      </div>
    </div>
  );
};

export default MainLocationForm;
