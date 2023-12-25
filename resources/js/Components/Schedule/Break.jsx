
import React, { useState, useEffect } from 'react';

import Textarea from '@mui/joy/Textarea';





const defaultDurations = {
  'Breakfast Break': { hour: '1', minute: '00' },
  'Lunch Break': { hour: '1', minute: '00' },
  'Dinner Break': { hour: '1', minute: '00' },
  'Bathroom Break': { hour: '0', minute: '10' },
  'Coffee Break': { hour: '0', minute: '15' },
  'Rehearsal Break': { hour: '1', minute: '00' },
  'Creative Break': { hour: '0', minute: '30' },
};


export default function Break({

  lightColorClass,
  sendClassToParent,
  data,
  onUpdateInfo,
  scheduleBreakData,

}) {


    const [combinedClass, setCombinedClass] = useState('');

    const [breakData, setBreakData] = useState({
      type: '',
      notes: '',
      hour: '12',
      minute: '00',
      ampm: 'AM',
      combinedClass: '',
      durationHour: '',
      durationMinute: '',
    });

    useEffect(() => {
      setBreakData({
        type: scheduleBreakData?.type || '',
        notes: scheduleBreakData?.notes || '',
        hour: scheduleBreakData?.hour || '12',
        minute: scheduleBreakData?.minute || '00',
        ampm: scheduleBreakData?.ampm || 'AM',
        combinedClass: scheduleBreakData?.combinedClass || '',
        durationHour: scheduleBreakData?.durationHour || '',
        durationMinute: scheduleBreakData?.durationMinute || '',
      });
    }, [scheduleBreakData]);

    useEffect(() => {
      // Only set default duration if it's a new break (no existing data)
      if (!breakData || (!breakData.durationHour && !breakData.durationMinute)) {
        setDefaultDuration(breakData.type);
      }
    }, [breakData]); // Dependency on data
  
    const setDefaultDuration = (breakType) => {
      const duration = defaultDurations[breakType] || { hour: '', minute: '' };
      setBreakData((prevData) => ({
        ...prevData,
        durationHour: duration.hour,
        durationMinute: duration.minute,
      }));
    };

 
    // Handle changes for the entire form
    const handleChange = (part, value) => {
      const updatedTimeParts = { ...breakData, [part]: value };

        // If it's a time component change, update startTime
        if (part === 'hour' || part === 'minute' || part === 'ampm') {
          updatedTimeParts.startTime = `${updatedTimeParts.hour.padStart(2, '0')}:${updatedTimeParts.minute.padStart(2, '0')} ${updatedTimeParts.ampm}`;
      }
  
      setBreakData(updatedTimeParts);

      onUpdateInfo(updatedTimeParts);

      setBreakData((prevData) => ({ ...prevData, [part]: value }));

      // If changing the break type, and there's no duration set, apply default
      if (part === 'type' && (!breakData.durationHour && !breakData.durationMinute)) {
        setDefaultDuration(value);
      }
    };

 
 
  return (
      <div className="flex flex-row w-full justify-between">
          <select 
            className='flex font-bold text-white content-center h-full max-w-[16rem] border-0 justify-start'
            value={breakData.type}
            onChange={(e) => handleChange('type', e.target.value)}
          >
            <option value="N/A" default disabled>Choose a Break Type</option>
            <option value="Breakfast Break">Breakfast Break</option>
            <option value="Lunch Break">Lunch Break</option>
            <option value="Dinner Break">Dinner Break</option>
            <option value="Bathroom Break">Bathroom Break</option>
            <option value="Coffee Break">Coffee Break</option>
            <option value="Rehearsal Break">Rehearsal Break</option>
            <option value="Creative Break">Creative Break</option>
          </select>

          <div className='flex content-center h-full w-full max-w-[45%] py-1'>
            <input
              maxLength={128}
              placeholder="Notes...."
              className='grow text-slate-500 text-xs border-0 bg-transparent !placeholder::text-white'
            />
          </div>

          <div className='flex flex-row justify-center w-full max-w-[8rem]'>

              <select 
                  className='text-white border-0 p-0' 
                  value={breakData.hour} 
                  onChange={(e) => handleChange('hour', e.target.value)}
              >
                  {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={i === 0 ? '12' : i.toString()}>{i === 0 ? '12' : i}</option>
                  ))}
              </select>

              <select 
                  className='text-white border-0 p-0' 
                  value={breakData.minute} 
                  onChange={(e) => handleChange('minute', e.target.value)}
              >
                  {Array.from({ length: 60 }, (_, i) => (
                      <option key={i} value={i.toString().padStart(2, '0')}>{i.toString().padStart(2, '0')}</option>
                  ))}
              </select>

              <select 
                  className='text-white border-0 p-0' 
                  value={breakData.ampm} 
                  onChange={(e) => handleChange('ampm', e.target.value)}
              >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
              </select>

          </div>

          <div className='flex flex-row justify-center w-full max-w-[6rem]'>
                <select 
                  className='text-white border-0 p-0' 
                  value={breakData.durationHour} 
                    onChange={(e) => handleChange('durationHour', e.target.value)}
                >
                    {Array.from({ length: 24 }, (_, i) => (
                        <option key={i} value={i === 0 ? '24' : i.toString()}>{i === 0 ? 'HH' : i}</option>
                    ))}
                </select>

                <select 
                    className='text-white border-0 p-0' 
                    value={breakData.durationMinute} 
                    onChange={(e) => handleChange('durationMinute', e.target.value)}
                >
                    {Array.from({ length: 12 }, (_, i) => (
                        <option key={i} value={i * 5}>{i === 0 ? '0' : i * 5}</option>
                    ))}
                </select>

            </div> 

      </div>
  );



}
 