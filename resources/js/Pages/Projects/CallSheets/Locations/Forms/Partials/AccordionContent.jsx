import React, { useState, useEffect, forwardRef, useCallback } from 'react';
import Input from '@/Components/Forms/Input';
import Address from '@/Components/Forms/Address';
 
const AccordionContent = forwardRef(({ 
    
    title, 
    onFormDataChange, 
    onInformationChange, 
    required 

}, ref) => {
    
    const [formData, setFormData] = useState({
        name: '',
        information: '',
        address: {}
    });
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
        // Initialize parent component with initial state of formData and information
        onFormDataChange && onFormDataChange(formData);
        onInformationChange && onInformationChange(information);
    }, []); // This will run only once when the component mounts

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
                    {`${title} Information`}
                </label>
                <textarea
                    placeholder={`${title} information`}
                    name={`${title.toLowerCase().replace(/\s/g, '_')}_information`}
                    value={information}
                    onChange={handleTextareaChange}
                    onKeyDown={(e) => {
                        // Prevent 'Enter' key from adding new lines
                        if (e.key === 'Enter') {
                            e.preventDefault();
                        }
                    }}
                    maxLength={maxChars}
                    style={{ resize: 'none' }}
                >
                </textarea>
                <p className='text-right text-xs font-bold'>{maxChars - information.length} characters remaining</p>
            </div>
            <Address onAddressChange={handleAddressChange} />
        </div>
    );
});

export default AccordionContent;
