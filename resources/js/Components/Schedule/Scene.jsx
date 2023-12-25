import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Textarea from '@mui/joy/Textarea';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';






export default function Scene({

    data,
    scheduleSceneData,
    lightColorClass, 
    sendClassToParent,
    onUpdateInfo,
     
}) {

 
    const [combinedClass, setCombinedClass] = useState('');

    const formattedShootLocation = data && data.film_location && data.film_location.location
    ? `${data.film_location.location.street_address}\n${data.film_location.location.city}, ${data.film_location.location.state} ${data.film_location.location.zip_code}`
    : "N/A. Add a location in the Call Sheets page";

    // Initial state setup
    const [sceneData, setSceneData] = useState({
        scene: scheduleSceneData?.scene || '',
        setting: scheduleSceneData?.setting || '',
        timeslot: scheduleSceneData?.timeslot || '',
        combinedClass: scheduleSceneData?.combinedClass || 'bg-slate-100',
        lightColorClass: scheduleSceneData?.lightColorClass || '!text-black',
        sceneLocation: scheduleSceneData?.sceneLocation || '',
        description: scheduleSceneData?.description || '',
        shootLocation: formattedShootLocation, 
        hour: scheduleSceneData?.hour || '12',
        minute: scheduleSceneData?.minute || '00',
        ampm: scheduleSceneData?.ampm || 'AM',
        durationHour: scheduleSceneData?.durationHour || '0Hr',
        durationMinute: scheduleSceneData?.durationMinute || '0Min',
    });

 
 
    useEffect(() => {
      // Update the combined class based on the combination of data
      let newClass = 'default-combination'; // Default class if no combination matches
  
      const combination = `${sceneData.setting}-${sceneData.timeslot}`.toUpperCase();
      switch (combination) {
          case "INT-DAY":
              newClass = 'bg-yellow-200';
              break;
          case "INT-NIGHT":
              newClass = 'bg-blue-800';
              break;
          case "EXT-DAY":
              newClass = 'bg-green-300';
              break;
          case "EXT-NIGHT":
              newClass = 'bg-purple-800';
              break;
          case "EXT-EVENING":
              newClass = 'bg-orange-500';
              break;
          case "INT-EVENING":
              newClass = 'bg-pink-500';
              break;
          case "EXT-MORNING":
              newClass = 'bg-blue-300';
              break;
          case "INT-MORNING":
              newClass = 'bg-indigo-300';
              break;
          case "EXT-DAWN":
              newClass = 'bg-purple-300';
              break;
          case "INT-DAWN":
              newClass = 'bg-violet-300';
              break;
          case "EXT-DUSK":
              newClass = 'bg-red-400';
              break;
          case "INT-DUSK":
              newClass = 'bg-red-600';
              break;
          case "EXT-NOON":
              newClass = 'bg-yellow-400';
              break;
          case "INT-NOON":
              newClass = 'bg-yellow-500';
              break;
          case "EXT-MIDNIGHT":
              newClass = 'bg-gray-900';
              break;
          case "INT-MIDNIGHT":
              newClass = 'bg-gray-800';
              break;
          case "EXT-TWILIGHT":
              newClass = 'bg-purple-500';
              break;
          case "INT-TWILIGHT":
              newClass = 'bg-purple-700';
              break;
          case "EXT-SUNSET":
              newClass = 'bg-orange-600';
              break;
          case "INT-SUNSET":
              newClass = 'bg-orange-700';
              break;
          case "EXT-SUNRISE":
              newClass = 'bg-yellow-500';
              break;
          case "INT-SUNRISE":
              newClass = 'bg-yellow-600';
              break;
          // Add more cases as necessary
          default:
              newClass = 'bg-slate-200'; // Fallback class
      }
  
        setCombinedClass(newClass);
        setSceneData(prevData => ({ ...prevData, combinedClass: newClass }));
        sendClassToParent(newClass); 
    }, [sceneData.setting, sceneData.timeslot]);
  
    const handleChange = (part, value) => {
        const updatedTimeParts = { ...sceneData, [part]: value };
    
        // If it's a time component change, update startTime
        // if (part === 'hour' || part === 'minute' || part === 'ampm') {
        //     updatedTimeParts.startTime = `${updatedTimeParts.hour.padStart(2, '0')}:${updatedTimeParts.minute.padStart(2, '0')} ${updatedTimeParts.ampm}`;
        // }
    
        setSceneData(updatedTimeParts);
        // Don't call onUpdate here as it will use the old state

        onUpdateInfo(updatedTimeParts);
    };
    
    useEffect(() => {
        // Notify the parent component of the update
        if (typeof onUpdate === 'function') {
            onUpdate(sceneData);
        }
    }, [sceneData]); // Trigger when sceneData changes
    
 
    const colorClassToHex = {
      '!text-white': '#fff', // Example hex code for bg-yellow-200
      '!text-black': '#000',   // Example hex code for bg-blue-800
     };

    const getHexColorFromClass = (className) => {
      return colorClassToHex[className] || '#000000'; // Default color if not found
    };

 
 
    console.log(sceneData);

  return (

        <div className='w-full'>
 
             <div className="flex flex-row w-full h-full gap-4 justify-between">

                <input 
                    className={`${lightColorClass} grow-0 flex content-center h-full max-w-[5rem] text-center !border-0 !bg-transparent`} 
                    type="text"
                    placeholder='Scene #'
                    value={sceneData.scene} 
                    onChange={(e) => handleChange('scene', e.target.value)}
                />

                <select 
                    className={`${lightColorClass} grow-0 flex content-center h-full text-xs max-w-[5rem] border-0`} 
                    value={sceneData.setting} 
                    onChange={(e) => handleChange('setting', e.target.value)}
                >
                    <option value="N/A">-</option>
                    <option value="INT">INT</option>
                    <option value="EXT">EXT</option>
                </select>

                <select 
                    className={`${lightColorClass} grow-0 flex content-center h-full text-xs max-w-[6rem] border-0`} 
                    value={sceneData.timeslot} 
                    onChange={(e) => handleChange('timeslot', e.target.value)}
                >
                    <option value="N/A" default>-</option>
                    <option value="DAY">DAY</option>
                    <option value="NIGHT">NIGHT</option>
                    <option value="EVENING">EVENING</option>
                    <option value="MORNING">MORNING</option>
                    <option value="DAWN">DAWN</option>
                    <option value="DUSK">DUSK</option>
                    <option value="NOON">NOON</option>
                    <option value="MIDNIGHT">MIDNIGHT</option>
                    <option value="TWILIGHT">TWILIGHT</option>
                    <option value="SUNSET">SUNSET</option>
                    <option value="SUNRISE">SUNRISE</option>
                </select>

                <div className={`${lightColorClass} grow-0 max-w-[15%] flex flex-col justify-center h-full text-xs`}> 
                    <input
                        value={sceneData.sceneLocation}
                        className={`${lightColorClass} bg-transparent rounded-md border-0 text-xs placeholder:text-slate-50`}
                        onChange={(e) => handleChange('sceneLocation', e.target.value)}
                        placeholder="Scene Location"
                        maxLength={28}
                    />
                </div>

                <div className={`${lightColorClass} flex content-center w-full max-w-[40%] py-1`}>
                    <Textarea
                        value={sceneData.description}
                        className={`${lightColorClass} placeholder:text-slate-50`}
                        onChange={(e) => handleChange('description', e.target.value)}
                        maxLength={189}
                        minRows={1}
                        maxRows={2}
                        placeholder="Scene Description"
                        sx={[
                            {
                                '--Textarea-placeholderColor': getHexColorFromClass(lightColorClass) + '!important',
                                'fontSize': '.75rem',
                                // 'padding': '.25rem',
                                '& .MuiTextarea-root textarea' : {
                                    color: 'red !important',
                                }
                             }
                        ]}
                    />
                </div> 

                <div className={`${lightColorClass} flex flex-col justify-center text-xs`}>{sceneData.shootLocation}</div>

                <div className={`${lightColorClass} flex flex-row justify-center w-full max-w-[8rem]`}>
                    <select 
                        className={`${lightColorClass} border-0 p-0`} 
                        value={sceneData.hour} 
                        onChange={(e) => handleChange('hour', e.target.value)}
                    >
                        {Array.from({ length: 12 }, (_, i) => (
                            <option key={i} value={i === 0 ? '12' : i.toString()}>{i === 0 ? '12' : i}</option>
                        ))}
                    </select>

                    <select 
                        className={`${lightColorClass} border-0 p-0`} 
                        value={sceneData.minute} 
                        onChange={(e) => handleChange('minute', e.target.value)}
                    >
                        {Array.from({ length: 60 }, (_, i) => (
                            <option key={i} value={i.toString().padStart(2, '0')}>{i.toString().padStart(2, '0')}</option>
                        ))}
                    </select>

                    <select 
                        className={`${lightColorClass} border-0 p-0`} 
                        value={sceneData.ampm} 
                        onChange={(e) => handleChange('ampm', e.target.value)}
                    >
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                    </select>
                </div> 
 
                <div className={`${lightColorClass} flex flex-row justify-center w-full max-w-[6rem]`}>
                    <select 
                        className={`${lightColorClass} border-0 p-0`} 
                        value={sceneData.durationHour} 
                        onChange={(e) => handleChange('durationHour', e.target.value)}
                    >
                        {Array.from({ length: 24 }, (_, i) => (
                            <option key={i} value={i === 0 ? '24' : i.toString()}>{i === 0 ? 'HH' : i}</option>
                        ))}
                    </select>

                    <select 
                        className={`${lightColorClass} border-0 p-0`} 
                        value={sceneData.durationMinute} 
                        onChange={(e) => handleChange('durationMinute', e.target.value)}
                    >
                        {Array.from({ length: 12 }, (_, i) => (
                            <option key={i} value={i * 5}>{i * 5}</option>
                        ))}
                    </select>
                </div> 

            </div>
        </div>

  );
}
