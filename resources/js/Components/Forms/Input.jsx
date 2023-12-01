import { inputGroupClass } from '@/Components/Scripts/Form';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Tooltip from '@mui/joy/Tooltip';
import Autocomplete from '@mui/joy/Autocomplete';


export default function Input({

    title,
    required = false,
    label,
    type = 'text',
    name = '',
    value,
    placeholder = 'This is an empty input',
    onChange,
    autoComplete,
    openToolTip,
    min,
    inputType = 'input',
    options,
    parentClass,
    inputClass,
    
    multiple,
    limitTags,
    autoCompleteOptions,
    sx,
    getOptionLabel,
    isOptionEqualToValue,

}) {


    const containerClass = `${inputGroupClass} ${parentClass}`;
    
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
            {
                inputType === 'dropdown' ? (
                    <Select name={name} value={value} onChange={onChange} autoComplete={autoComplete} placeholder={placeholder}>
                        {options.map((option, index) => (
                            <Option key={index} value={option.value}>
                                {option.label}
                            </Option>
                        ))}
                    </Select>
                ) : inputType === 'autoComplete' ? (
                    <Autocomplete
                        multiple={multiple}
                        placeholder={placeholder}
                        limitTags={limitTags}
                        options={autoCompleteOptions}
                        getOptionLabel={getOptionLabel}
                        isOptionEqualToValue={isOptionEqualToValue}
                        sx={{sx}}
                        value={value}
                        onChange={onChange}
                        required={required}
                        selectOnFocus
                        clearOnBlur
                        handleHomeEndKeys
                        className={inputClass}
                    />
                ) : (
                    <input
                        type={type}
                        className={inputClass}
                        name={name}
                        min={min}
                        placeholder={placeholder}
                        value={value} 
                        required={required}
                        onChange={onChange}
                        autoComplete={autoComplete}
                    />
                )
            }
            </Tooltip>

        </div>
    );

}
