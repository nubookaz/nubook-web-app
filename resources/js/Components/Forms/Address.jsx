import React, {  useState, useEffect } from 'react';
import { formGroupClass, multiColInputClass } from '@/Components/Scripts/Form';

import Input from '@/Components/Forms/Input';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Tooltip from '@mui/joy/Tooltip';



export default function Address ({

  data,
  onUpdateInfo,
  emptyFields,
  setEmptyFields,
 
})  {

  const [selectedState, setSelectedState] = useState('');
 
  useEffect(() => {
    // This effect ensures that the selected state is updated
    // whenever the data prop changes
    setSelectedState(data.state || '');
  }, [data.state]);

  
  const handleChange = (field, value) => {
    onUpdateInfo(field, value);

  };  

  const handleStateChange = (event, newValue) => {
    setSelectedState(newValue);
    onUpdateInfo('state', newValue);
    
  };

  

  return (


        <div className={formGroupClass}>
            <Input
              openToolTip={false}
              label="Street Address"
              type="text"
              name="street_address"
              value={data.street_address}
              placeholder="3526 W Goapple St"
              onChange={(e) => handleChange('street_address', e.target.value)}  
            >
            </Input>

            <div className={multiColInputClass}>
                <Input
                  openToolTip={false}
                  label="City"
                  type="text"
                  name="city"
                  value={data.city}
                  placeholder="San Francisco"
                  onChange={(e) => handleChange('city', e.target.value)}
                  >
                </Input>



                <div className='flex flex-col gap-2 w-full'>
                    <label htmlFor="state" className='text-gray-400 text-sm'> State * </label>
                    <Tooltip arrow sx={{ fontSize: '.75rem' }} title="State is Required" open={emptyFields['state'] || false} color="danger" placement="top" variant="outlined">
                      <Select
                          inputType='dropdown'
                          name="state"
                          placeholder="Select a State"
                          value={selectedState}
                          onChange={handleStateChange}
                          autocomplete=''
                      >

                          {stateOptions.map((option, index) => (
                              <Option key={index} value={option.value}>
                                  {option.label}
                              </Option>
                          ))}
                      </Select>
                    </Tooltip>
                </div>

                <Input
                  openToolTip={false}
                  label="Zip Code"
                  type="text"
                  name="zip_code"
                  value={data.zip_code}
                  placeholder="95026"
                  onChange={(e) => handleChange('zip_code', e.target.value)}
                  >
                </Input>
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

