import React, { useState, forwardRef } from 'react';
import Tooltip from '@mui/joy/Tooltip';

const Input = forwardRef(({
    title,
    required = false,
    label,
    type = 'text',
    name = '',
    value,
    placeholder = 'This is an empty input',
    onChange,
    autoComplete,
    parentClass,
    inputClass,
}, ref) => {
    const [openToolTip, setOpenToolTip] = useState(false);

    const handleBlur = () => {
        if (ref && ref.current && ref.current.value === '') {
            setOpenToolTip(true);
        } else {
            setOpenToolTip(false);
        }
    };
    
    const containerClass = `flex flex-col gap-2 w-full ${parentClass}`;

    return (
        <div className={containerClass}>
            <label htmlFor={name} className='text-gray-400 text-sm'>
                {label} {required && '*'}
            </label>

            <Tooltip 
                arrow 
                title={`${title} is Required`} 
                open={openToolTip}
                color="danger" 
                placement="top" 
                variant="outlined"
            >
                <input
                    ref={ref}
                    type={type}
                    className={`bg-white ${inputClass}`}
                    name={name}
                    placeholder={placeholder}
                    value={value} 
                    required={required}
                    onChange={onChange}
                    autoComplete={autoComplete}
                    onBlur={handleBlur}
                />
            </Tooltip>
        </div>
    );
});

export default Input;
