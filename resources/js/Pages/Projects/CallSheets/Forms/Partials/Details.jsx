import React from 'react';
import Input from '@/Components/Forms/Input';

export default function Details ({ 
  
  callSheet, 
  onUpdateInfo 

}) {
  const handleChange = (field, value) => {
    onUpdateInfo(field, value);
  };

  function convertDateTimeFormat(dateTimeStr) {
      if (!dateTimeStr || typeof dateTimeStr !== 'string') return '';

      // Check if the dateTimeStr is already in the expected format (yyyy-MM-ddTHH:mm)
      const regexISO8601 = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
      if (regexISO8601.test(dateTimeStr)) {
          return dateTimeStr;
      }

      const parts = dateTimeStr.match(/(\d{4}-\d{2}-\d{2})\s+(\d+):(\d+)\s+(AM|PM)/);
      if (!parts) return '';

      let [ , date, hours, minutes, meridiem] = parts;
      hours = parseInt(hours);
      minutes = parseInt(minutes);

      // Convert to 24-hour format if PM
      if (meridiem === 'PM' && hours < 12) {
          hours += 12;
      } else if (meridiem === 'AM' && hours === 12) {
          hours = 0; // Midnight in 24-hour format
      }

      // Ensure hours and minutes are two digits
      hours = ('0' + hours).slice(-2);
      minutes = ('0' + minutes).slice(-2);

      return `${date}T${hours}:${minutes}`;
  }

  return (
    <div className='flex flex-col gap-6'>
      <Input
          required
          title="Call Sheet Name"
          label="Call Sheet Name"
          type="text"
          name="call_sheet_name"
          value={callSheet.call_sheet_name}
          placeholder="Day 1 - Scenes 1,4,5 @ Ark"
          onChange={(e) => handleChange('call_sheet_name', e.target.value)}
          openToolTip={!callSheet.call_sheet_name}
      />

      <Input
          required
          title="Call Sheet Date and General Call Time"
          label="Call Sheet Date and General Call Time"
          type="datetime-local"
          name="call_sheet_date_time"
          value={convertDateTimeFormat(callSheet.call_sheet_date_time)}
          placeholder="February 14th, 1964"
          onChange={(e) => handleChange('call_sheet_date_time', e.target.value)}
          openToolTip={!callSheet.call_sheet_date_time}
      />
    </div>
  );
}