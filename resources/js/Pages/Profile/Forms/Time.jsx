import React, { useState, useEffect, useCallback } from 'react';

const Time = React.memo(({ initialTime, onTimeChange, className, textColor }) => {
    const [time, setTime] = useState({ hours: '8', minutes: '00', ampm: 'AM' });

    useEffect(() => {
        const timeParts = initialTime?.match(/(\d{1,2}):(\d{2})\s(AM|PM)/i); // Case insensitive match
    
        if (timeParts) {
            // Remove leading zero if present by converting the hour part to an integer
            const hours = String(parseInt(timeParts[1], 10));
  
            setTime({
                hours: hours,
                minutes: timeParts[2],
                ampm: timeParts[3].toUpperCase() // Normalize to uppercase
            });
        }
    }, [initialTime]);
    

    const handleChange = useCallback((part, value) => {
        const newTime = { ...time, [part]: value };
        // For hours, remove leading zero for internal state to match select options
        if (part === 'hours') {
            newTime.hours = String(parseInt(value, 10));
        }
        setTime(newTime);
        // When formatting time for output, add leading zero to hours if less than 10
        const formattedHours = parseInt(newTime.hours, 10) < 10 ? `0${newTime.hours}` : newTime.hours;
        const formattedTime = `${formattedHours}:${newTime.minutes} ${newTime.ampm}`;
        if (formattedTime !== initialTime) {
            onTimeChange(formattedTime);
        }
    }, [time, initialTime, onTimeChange]);

    return (
        <div className={`${className} flex flex-row w-full gap-2`}>
            <select
                name="hours"
                className={`${textColor ? textColor : 'text-slate-400'} bg-slate-100 w-[8rem] text-md appearance-none outline-none`}
                value={time.hours}
                onChange={(e) => handleChange('hours', e.target.value)}
            >
                {[...Array(12).keys()].map(hour => (
                    <option key={hour + 1} value={hour + 1}>{hour + 1}</option>
                ))}
            </select>
            <span className={`${textColor ? textColor : 'text-slate-400'} text-2xl mx-[.10rem] my-auto font-bold`}>:</span>
            <select
                name="minutes"
                className={`bg-slate-100 ${textColor ? textColor : 'text-slate-400'}  w-[9rem] text-md appearance-none outline-none`}
                value={time.minutes}
                onChange={(e) => handleChange('minutes', e.target.value)}
            >
                <option value="00">00</option>
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="45">45</option>
            </select>
            <select
                name="ampm"
                className={`bg-slate-100 ${textColor ? textColor : 'text-slate-400'}  w-[11rem] text-md appearance-none outline-none`}
                value={time.ampm}
                onChange={(e) => handleChange('ampm', e.target.value)}
            >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </select>
        </div>
    );
});

export default Time;
