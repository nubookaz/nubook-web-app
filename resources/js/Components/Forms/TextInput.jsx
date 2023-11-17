import { forwardRef, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, icon, iconClass, placeholder, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className="relative flex flex-row">
            {icon && (
                <div className={`custom-icon inset-y-0 flex items-center pointer-events-none ${iconClass || ''}`}>
                <FontAwesomeIcon icon={icon} />
                </div>
            )}
            <input
                {...props}
                type={type}
                placeholder={placeholder}
                className={`custom-input ${icon ? 'pl-[3.5rem]' : ''} ${className}`}
                ref={input}
            />
        </div>
    );
});
