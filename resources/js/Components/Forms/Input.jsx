import { formClass, formGroupClass, inputGroupClass, twoColInputGroupClass } from '@/Components/Scripts/Form';
import Tooltip from '@mui/joy/Tooltip';


export default function Input({

    title,
    required = false,
    label,
    type,
    name = '',
    value,
    placeholder,
    onChange,
    autoComplete,
    openToolTip,

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
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={value} 
                    required={required}
                    onChange={onChange}
                    autoComplete={autoComplete}
                />
            </Tooltip>

        </div>
    );

}
