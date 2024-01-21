import React from 'react';






function PrimaryButton({ 
  
  children, 
  onClick, 
  className

}) { 


      return (
          <button
              className={`default-btn rounded-lg cursor-pointer duration-500 transition-all bg-emerald-500 text-emerald-50 ${className}`}
              onClick={onClick}
          >   
              {children}
          </button>
      );

}

export default PrimaryButton;
