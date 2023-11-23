import React, {  useState } from 'react';
import { formGroupClass, multiColInputClass } from '@/Components/Scripts/Form';

import Input from '@/Components/Forms/Input';

export default function Address ({

  data,
  onUpdateInfo,
  emptyFields,
  setEmptyFields,
 
})  {

  
  const handleChange = (field, value) => {
    onUpdateInfo(field, value);


    if (emptyFields[field]) {
         setEmptyFields((prevEmptyFields) => ({
            ...prevEmptyFields,
            [field]: false
        }));
    }
  };

 
  return (


        <div className={formGroupClass}>
 
            <div className={multiColInputClass}>
                <Input
                  required
                  openToolTip={emptyFields['first_name'] || false}
                  label="Your First Name"
                  type="text"
                  name="first_name"
                  value={data.first_name}
                  placeholder="Daniel"
                  autoComplete="given-name"
                  onChange={(e) => handleChange('first_name', e.target.value)}
                  >
                </Input>

                <Input
                openToolTip={emptyFields['middle_initial'] || false}
                  label="M.I."
                  type="text"
                  name="middle_initial"
                  placeholder="D"
                  value={data.middle_initial}
                  autoComplete="additional-name"
                  onChange={(e) => handleChange('middle_initial', e.target.value)}
                  >
                </Input>

                <Input
                  required
                  openToolTip={emptyFields['last_name'] || false}
                  label="Last Name"
                  type="text"
                  name="last_name"
                  value={data.last_name}
                  placeholder="Lewis"
                  autoComplete="family-name"
                  onChange={(e) => handleChange('last_name', e.target.value)}
                  >
                </Input>
            </div>

            
        </div>

 
  );


}
