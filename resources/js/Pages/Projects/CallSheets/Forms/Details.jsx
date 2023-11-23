import React, {  useState } from 'react';
import { formGroupClass } from '@/Components/Scripts/Form';

import Input from '@/Components/Forms/Input';
import Address from '@/Components/Forms/Address';

export default function Details ({

  data,
  onUpdateInfo,
  emptyFields,
  setEmptyFields,
  minDate,

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
          
            <Input
              required
              openToolTip={emptyFields['call_sheet_name'] || false}
              label="Call Sheet Name"
              type="text"
              name="call_sheet_name"
              value={data.call_sheet_name}
              placeholder="Day 1 - Scenes 1,4,5 @ Ark"
              onChange={(e) => handleChange('call_sheet_name', e.target.value)}  
            >
            </Input>

            <Input
              required
              openToolTip={emptyFields['call_sheet_date'] || false}
              label="Call Sheet Date"
              type="date"
              name="call_sheet_date"
              min={minDate}
              value={data.call_sheet_date}
              placeholder="February 14th, 1964"
              onChange={(e) => handleChange('call_sheet_date', e.target.value)}
            >
            </Input>

        </div>

 
  );
}

 
