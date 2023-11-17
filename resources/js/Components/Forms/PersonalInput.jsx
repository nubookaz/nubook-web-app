import React from 'react';
import TextInput from './TextInput'; // Import the TextInput component

export default function PersonalInput({ icon, iconClass, ...props }) {
    return (
        <TextInput
            {...props}
            icon={icon}
            iconClass={iconClass}
            className="your-personal-input-class" // Add any additional classes specific to PersonalInput
        />
    );
}
