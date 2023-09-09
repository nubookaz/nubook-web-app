import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Scene(props) {
    const [dataInColumn2, setDataInColumn2] = useState("INT");
    const [dataInColumn3, setDataInColumn3] = useState("DAY");
    const [combinedClass, setCombinedClass] = useState('');
    const [location, setLocation] = useState("Location");
    const [talentId, setTalentId] = useState("Talent ID");
    const [shootLocation, setShootLocation] = useState("Shoot Location");
    const [description, setDescription] = useState(""); // Description text state
    const [startTime, setStartTime] = useState("00:00"); // Start time state
    const [formattedStartTime, setFormattedStartTime] = useState("12:00 AM"); // Formatted start time state

    // Define CSS classes based on the type
    const containerClass = `schedule-container flex flex-row`;
  
    useEffect(() => {
      // Update the combined class based on the combination of data
      if (dataInColumn2 === "INT" && dataInColumn3 === "DAY") {
        setCombinedClass('int-day-combination');
      } else if (dataInColumn2 === "INT" && dataInColumn3 === "NIGHT") {
        setCombinedClass('int-night-combination');
      } else if (dataInColumn2 === "EXT" && dataInColumn3 === "DAY") {
        setCombinedClass('ext-day-combination');
      } else if (dataInColumn2 === "EXT" && dataInColumn3 === "NIGHT") {
        setCombinedClass('ext-night-combination');
      } else {
        setCombinedClass('');
      }

      props.sendClassToParent(combinedClass);
    }, [dataInColumn2, dataInColumn3]);
  
    const handleColumn2Change = (e) => {
      setDataInColumn2(e.target.value);
    };
  
    const handleColumn3Change = (e) => {
      setDataInColumn3(e.target.value);
    };
  
    const handleDescriptionChange = (e) => {
      const value = e.target.value;
      if (value.length <= 180) {
        setDescription(value);
      }
    };
  
    const handleStartTimeChange = (e) => {
      const selectedTime = e.target.value;
      setStartTime(selectedTime);
      // Format and set the formatted start time for display
      setFormattedStartTime(formatTimeTo12Hour(selectedTime));
    };
    
    // Function to convert 24-hour time to 12-hour format with AM/PM
    const formatTimeTo12Hour = (time) => {
      const [hour, minute] = time.split(":");
      const hourInt = parseInt(hour, 10);
      const ampm = hourInt >= 12 ? "PM" : "AM";
      const formattedHour = hourInt === 0 ? "12" : (hourInt > 12 ? (hourInt - 12).toString() : hour);
      return `${formattedHour}:${minute} ${ampm}`;
    };
  return (
      <div className={`${containerClass} ${combinedClass}`}>
        {/* Second Row for the Dropdowns */}
        <div className="col w-full">
          {/* Dropdown for the second column */}
          <select value={dataInColumn2} onChange={handleColumn2Change}>
            <option value="INT">INT</option>
            <option value="EXT">EXT</option>
          </select>
          {/* Dropdown for the third column */}
          <select value={dataInColumn3} onChange={handleColumn3Change}>
            <option value="DAY">DAY</option>
            <option value="NIGHT">NIGHT</option>
          </select>
          {/* Additional columns */}
          <div className="column">Location: {location}</div>
          <div className="column">
            {/* Description text box with max length of 180 characters */}
            <textarea
              rows="4"
              cols="50"
              value={description}
              onChange={handleDescriptionChange}
              maxLength={180}
              placeholder="Description"
            />
          </div>
          <div className="column">Talent ID: {talentId}</div>
          <div className="column">Shoot Location: {shootLocation}</div>
          <div className="column">
            {/* Dropdown for Start Time with formatted time */}
            <select value={startTime} onChange={handleStartTimeChange}>
                {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                    {`${i === 0 ? '12' : (i > 12 ? (i - 12).toString() : i.toString())}:00 ${i >= 12 ? 'PM' : 'AM'}`}
                    </option>
                ))}
            </select>
          </div>
        </div>
      </div>
  );
}

export default Scene;
