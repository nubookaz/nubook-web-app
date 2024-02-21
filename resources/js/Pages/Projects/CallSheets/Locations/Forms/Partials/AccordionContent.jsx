import React, { useState, useEffect, forwardRef } from 'react';
import Input from '@/Components/Forms/Input';
import Address from '@/Pages/Profile/Forms/Address';

const AccordionContent = forwardRef(({
    callSheet,
    dataType,
    title,
    onFormDataChange,
    onInformationChange,
    required,
    label,
    resetSignal,
}, ref) => {

    
    
    const [formData, setFormData] = useState({ name: '', address: {} });
    const [information, setInformation] = useState('');
    
    const handleInputChange = (e) => {
        const updatedFormData = { ...formData, name: e.target.value };
        setFormData(updatedFormData);
        onFormDataChange && onFormDataChange(updatedFormData);
    };

    const handleTextareaChange = (e) => {
        setInformation(e.target.value);
        onInformationChange && onInformationChange(e.target.value);
    };

    const handleAddressChange = (newAddress) => {
        const updatedFormData = { ...formData, address: newAddress };
        setFormData(updatedFormData);
        onFormDataChange && onFormDataChange(updatedFormData);
    };

    useEffect(() => {
        // Extract general properties
        let baseData = {
            name: callSheet?.name || '',
            information: callSheet?.information || ''
        };
    
        // Enhance baseData based on dataType
        let locationData = {};
        switch (dataType) {
            case 'location':
                locationData = callSheet?.location || {};
                break;
            case 'parking':
                locationData = callSheet?.parking_location?.location || {};
                break;
            case 'hospital':
                locationData = callSheet?.hospital_location?.location || {};
                break;
            default:
                locationData = {};
        }
    
        // Combine baseData with specific location data
        const updatedFormData = {
            ...baseData,
            address: locationData || {} 
        };
    
        setFormData(updatedFormData);
        setInformation(baseData.information);
    
        // Update the parent component with the new data
        onFormDataChange && onFormDataChange(updatedFormData);
        onInformationChange && onInformationChange(baseData.information);
    }, [callSheet, dataType]);
    
    

    useEffect(() => {
        setFormData({ name: '', address: {} });
        setInformation('');
        onFormDataChange && onFormDataChange({ name: '', address: {} });
        onInformationChange && onInformationChange('');
    }, [resetSignal]);
    

    const maxChars = 200;
 
    return (
        <div className='flex flex-col gap-2'>
            <Input
                ref={ref}
                title={title}
                label={title}
                name={`${title.toLowerCase().replace(/\s/g, '_')}_name`}
                placeholder={`${title} Name`}
                required={required}
                value={formData.name}
                onChange={handleInputChange}
            />
            <div>
                <label htmlFor={`${title.toLowerCase().replace(/\s/g, '_')}_information`} className='text-gray-400 text-sm'>
                    {`${label} Information`}
                </label>
                <textarea
                    placeholder={`${title} information`}
                    name={`${title.toLowerCase().replace(/\s/g, '_')}_information`}
                    value={information}
                    onChange={handleTextareaChange}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') e.preventDefault();
                    }}
                    maxLength={maxChars}
                    style={{ resize: 'none' }}
                />
                <p className='text-right text-xs font-bold'>{maxChars - information.length} characters remaining</p>
            </div>
            <Address onAddressChange={handleAddressChange} data={formData.address} />
        </div>
    );
});

export default AccordionContent;
