// CardComponent.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGrip } from '@fortawesome/free-solid-svg-icons';
 
export default function CardContainer({
    children,
    header,
    className = '',
    onClick,
    textClassName,
  }) {
    function containsBackgroundClass(className) {
      const bgClassPattern = /\bbg-\S+/; // Regular expression to match 'bg-' followed by non-whitespace characters
      return bgClassPattern.test(className);
    }
    function containsTextClass(className) {
      const textClassPattern = /\btext-\S+/; // Regular expression to match 'bg-' followed by non-whitespace characters
      return textClassPattern.test(className);
    }
  
    const finalClassName = containsBackgroundClass(className) ? className : `bg-white ${className}`;
    const finalTextClassName = containsTextClass(textClassName) ? textClassName : `text-slate-400 ${textClassName}`;
  
    // Add styles for the scrolling content
    const contentStyle = {
    //   maxHeight: '100%', // Example height, adjust as needed
      overflowY: 'auto',
    };
  
    return (
      <div className={`${finalClassName} p-6 shadow-sm rounded-2xl flex flex-col gap-2 ${header ? '' : 'relative'}`}>
        {(header || onClick) && (
          <div className={`${header ? 'w-full flex flex-row justify-between items-center' : 'absolute right-6'}`}>
            {header && (
              <div>
                <h4 className={`${finalTextClassName} w-full text-sm`}>{header}</h4>
              </div>
            )}
            {onClick && (
              <div variant="plain">
                <FontAwesomeIcon onClick={onClick} className={`${finalTextClassName} w-[1.3rem] cursor-pointer hover:text-slate-500 duration-300 text-2xl`} icon={faGrip} />
              </div>
            )}
          </div>
        )}
  
        <div style={contentStyle} className="flex flex-col h-full">
          {children}
        </div>
      </div>
    );
  }
  