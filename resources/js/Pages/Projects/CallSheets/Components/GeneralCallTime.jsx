import React, { useState, useEffect } from 'react';

import CardContainer from '@/Components/Containers/CardContainer';
  
 

export default function GeneralCallTime({ 

    data, 
    newData, 
    onEditProductionDetails

 }){
    
     
    function formatTime(dateString) {
        const date = new Date(dateString);
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
      
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const formattedHours = hours.toString();
        const formattedMinutes = minutes.toString().padStart(2, '0');
      
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
      }
      


      const [callTime, setCallTime] = useState(null);

    useEffect(() => {
        let timeValue = '';
      
        if (newData && newData.call_sheet_date_time) {
          timeValue = formatTime(newData.call_sheet_date_time);
        } else if (data && data.call_sheet_date_time) {
          timeValue = formatTime(data.call_sheet_date_time);
        }
        
        setCallTime(timeValue); // Set the formatted time
    }, [data, newData]);

    
  
    return(

        <CardContainer className="" header="General Call Time" showButtonIcon={true} onClickButton={onEditProductionDetails} >
            <div className="flex flex-col gap-4">
                {callTime && (
                  <h2>{callTime}</h2>
                )}
            </div>
        </CardContainer>

    );

}

