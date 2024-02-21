import React, { useState, forwardRef } from 'react';
import Tooltip from '@mui/joy/Tooltip';

const Select = forwardRef(({

    title,
    required = false,
    label,
    name = '',
    value,
    placeholder = 'Please select an option',
    onChange,
    className,
    selectClass,
    children, 

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
            <label htmlFor={name} className='text-gray-400 text-sm'>
                {label} {required && '*'}
            </label>

            <Tooltip
                arrow
                title={`${title} is Required`}
                open={required ? openToolTip : false}
                color="danger"
                placement="top"
                variant="outlined"
            >
                <select
                    ref={ref}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={handleBlur}
                    required={required}
                    className={`bg-white ${selectClass}`}
                >
                    {placeholder && <option value="">{placeholder}</option>}
                    {children}
                </select>
            </Tooltip>
        </div>
    );
});

export default Select;
