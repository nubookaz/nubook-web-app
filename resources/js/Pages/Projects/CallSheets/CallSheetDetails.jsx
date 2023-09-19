import React from 'react';

import Tooltip from '@mui/joy/Tooltip';
import Input from '@mui/joy/Input';









function CallSheetDetails({ callSheetData, setCallSheetTitle, setCallSheetDate, checkFormStatus }) {

    const { callSheetTitle, callSheetDate } = callSheetData;

    const isFormFilled = checkFormStatus();





  return (


    <div>
        <Tooltip
            title="Call Sheet Title is required"
            placement="top"
            arrow
            >
            <Input 
                placeholder="Call Sheet Title" 
                value={callSheetTitle} 
                onChange={(e) => {
                const newCallSheetTitle = e.target.value;
                setCallSheetTitle(newCallSheetTitle); // Update parent component's state
                const isFormFilled = checkFormStatus();
                }}
            />
        </Tooltip>

        <Tooltip
            title="Call Sheet Date is Required"
            placement="top"
            arrow
            >
            <Input 
                placeholder="Call Sheet Date" 
                type="date"
                value={callSheetDate} 
                onChange={(e) => {
                const newCallSheetDate = e.target.value;
                setCallSheetDate(newCallSheetDate); // Update parent component's state
                const isFormFilled = checkFormStatus();
                }}
            />
        </Tooltip>
    </div>



  );
}








export default CallSheetDetails;
