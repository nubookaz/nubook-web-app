import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'; // Import the caret icon

export default forwardRef(function Dropdown({
  className = '',
  isFocused = false,
  icon,
  iconClass,
  placeholder,
  options = [],
  onChange,
  ...props
}, ref) {
  const input = ref ? ref : useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCaretUp, setIsCaretUp] = useState(false); // State to track caret direction

  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    setIsCaretUp(false); // Reset caret direction when an option is selected
    if (onChange) {
      onChange(option);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setIsCaretUp(!isOpen); // Toggle caret direction when the input is clicked
  };

  return (
    <div className={`relative flex flex-row ${icon ? 'dropdown-icon' : 'dropdown-no-icon'}`}>
      {icon && (
        <div className={`custom-icon inset-y-0 flex items-center pointer-events-none z-50 max-h-[3.6rem] ${iconClass || ''}`}>
          <FontAwesomeIcon icon={icon} />
        </div>
      )}
      <div className={`relative custom-dropdown w-full ${isOpen ? 'border-b border-l border-r rounded-b-md' : ''}`}>
        <input
          {...props}
          type="text"
          placeholder={placeholder}
          className={`custom-input ${icon ? 'pl-[3.5rem]' : ''} ${className}`}
          ref={input}
          onClick={() => setIsOpen(!isOpen)}
          value={selectedOption || ''}
          readOnly
        />
        {isOpen && (
          <ul className={`custom-dropdown-options w-full mt-2`}>
            {options.map((option, index) => (
              <li
                key={index}
                className="custom-dropdown-option py-2 px-4 secondary-color"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}

        <div className="custom-caret-icon absolute inset-y-0 right-0 flex items-center pointer-events-none pr-[1.5rem] max-h-[3.6rem]">
          <FontAwesomeIcon icon={isCaretUp ? faCaretUp : faCaretDown} /> {/* Use the appropriate caret icon */}
        </div>
      </div>
    </div>
  );
});
