import React from 'react';






function PrimaryButton({ 
  
  children, 
  onClick, 
  className

}) { 


      return (
          <button
              className={`default-btn bg-emerald-500 rounded-lg cursor-pointer duration-500 transition-all text-emerald-50 ${className}`}
              onClick={onClick}
          >   
              {children}
          </button>
      );

}

export default PrimaryButton;
