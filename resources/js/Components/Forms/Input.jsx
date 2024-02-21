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
    min,
    max,
    autoComplete,
    className,
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
    
    const containerClass = `flex flex-col gap-2 w-full ${className}`;

    return (
        <div className={containerClass}>
            {label ? (
                <label htmlFor={name} className='text-gray-400 text-sm'>
                    {label} {required && '*'}
                </label>
            ):null}


            <Tooltip 
                arrow 
                title={`${title} is Required`} 
                open={required ? openToolTip : false}
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
                    value={value || ''} 
                    required={required}
                    onChange={onChange}
                    min={min}
                    max={max}
                    autoComplete={autoComplete}
                    onBlur={handleBlur}
                />
            </Tooltip>
        </div>
    );
});

export default Input;
