import { inputGroupClass } from '@/Components/Scripts/Form';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Tooltip from '@mui/joy/Tooltip';


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

}) {

    
    return (
        <div className={inputGroupClass}>
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
                {inputType == 'dropdown' ? (
                    <Select name={name} value={value} onChange={onChange }autoComplete={autoComplete} placeholder={placeholder}>
                         {options.map((option, index) => (
                          <Option key={index} value={option.value}>
                            {option.label}
                          </Option>
                        ))}
                    </Select>
                ):(
                    <input
                        type={type}
                        name={name}
                        min={min}
                        placeholder={placeholder}
                        value={value} 
                        required={required}
                        onChange={onChange}
                        autoComplete={autoComplete}
                    />
                )}
               
            </Tooltip>

        </div>
    );

}
