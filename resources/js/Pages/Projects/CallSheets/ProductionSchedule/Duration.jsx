import React, { useState, useEffect } from 'react';
import EditableSelect from './EditableSelect'; // Adjust path as necessary

// Define options outside the component if they don't depend on props
const hourOptions = Array.from({ length: 13 }, (_, i) => ({ label: `${i} Hrs`, value: i.toString() }));
const minuteOptions = Array.from({ length: 12 }, (_, i) => ({ label: `${i * 5} Min`, value: (i * 5).toString() }));

export default function Duration({ duration, handleDurationChange, textColor }) {
    const parseDuration = (durationString) => {
        // Ensure durationString is a string
        if (typeof durationString !== 'string') {
             return { hours: "0", minutes: "0" }; // Return a default value if not a string
        }
    
        const parts = durationString.split(' ');
        return { hours: parts[0], minutes: parts[2] }; // Assuming the format "X hours Y minutes"
    };
    
    // Initial parsing of the duration prop
    const { hours, minutes } = duration ? parseDuration(duration) : { hours: "0", minutes: "0" };

    // State for hours and minutes
    const [hoursState, setHours] = useState(hours);
    const [minutesState, setMinutes] = useState(minutes);

    useEffect(() => {
        // Update local state when the duration prop changes
        if (duration) {
            const { hours, minutes } = parseDuration(duration);
            setHours(hours);
            setMinutes(minutes);
        }
    }, [duration]);

    // Update function to handle changes in hours or minutes
    const updateDuration = (newHours, newMinutes) => {
        // Format and trigger the update callback
        handleDurationChange(`${newHours} hours ${newMinutes} minutes`);
    };

    return (
        <div className={`flex flex-row w-[12rem] justify-center text-center`}>
            <EditableSelect
                value={hoursState}
                onChange={(newHours) => {
                    setHours(newHours);
                    updateDuration(newHours, minutesState);
                }}
                options={hourOptions}
                className={`${textColor} !pr-0`}
             />
            <EditableSelect
                value={minutesState}
                onChange={(newMinutes) => {
                    setMinutes(newMinutes);
                    updateDuration(hoursState, newMinutes);
                }}
                options={minuteOptions}
                className={`${textColor} !pl-0`}
            />
        </div>
    );
}
