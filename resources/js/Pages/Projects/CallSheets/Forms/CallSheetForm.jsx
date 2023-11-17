import React from 'react';
import { formClass, formGroupClass, inputGroupClass, twoColInputGroupClass } from '@/Components/Scripts/Form';

import Input from '@/Components/Forms/Input';

export default function CallSheetForm ({

  data,
  onUpdateCallSheetInfo,
  emptyFields,
  setEmptyFields,

})  {


  const handleChange = (field, value) => {
    onUpdateCallSheetInfo(field, value);
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
          value={data.call_sheet_date}
          placeholder="February 14th, 1964"
          onChange={(e) => handleChange('call_sheet_date', e.target.value)}
        >
        </Input>
    </div>


  );
}

 
