import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@inertiajs/react';
import React from 'react';







function SecondaryButton({ 
  
  children, 
  onClick,  
  className, 

}) {

  function containsTextClass(className) {
      const textClassPattern = /\btext-\S+/; // Regular expression to match 'bg-' followed by non-whitespace characters
      return textClassPattern.test(className);
  }

  const finalTextClassName = containsTextClass(className) ? className : `text-slate-300 ${className}`;

  return (

      <button
          className={`${finalTextClassName} default-btn rounded-lg cursor-pointer duration-500 hover:text-slate-500 transition-all bg-slate-100 hover:bg-slate-200`}
          onClick={onClick}
          >
          {children}
      </button>

  );
 
}

export default SecondaryButton;
