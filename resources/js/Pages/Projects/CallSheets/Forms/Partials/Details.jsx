import React, {  useState } from 'react';
import { formGroupClass, multiColInputClass } from '@/Components/Scripts/Form';

import Input from '@/Components/Forms/Input';
 
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
              openToolTip={emptyFields['call_sheet_date_time'] || false}
              label="Call Sheet Date and General Call Time"
              type="datetime-local"
              name="call_sheet_date_time"
              min={minDate}
              value={data.call_sheet_date_time}
              placeholder="February 14th, 1964"
              onChange={(e) => handleChange('call_sheet_date_time', e.target.value)}
            >
            </Input>
 
        </div>

 
  );
}

 
