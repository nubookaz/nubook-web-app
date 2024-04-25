import { useProfile } from '@/Components/Contexts/UserProfileContext';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGrip } from '@fortawesome/free-solid-svg-icons';
 
export default function CardContainer({
    children,
    header,
    className = '',
    onClick,
    textClassName,
    childrenClass,
  }) {

    const { darkModeSetting } = useProfile();

    const defaultClasses = {
      light: { background: 'bg-white', text: 'text-slate-400' },
      dark: { background: 'bg-slate-900', text: 'text-white' },
      midnight: { background: 'bg-slate-800', text: 'text-white' },
    };
    
    const getDefaultClass = (type, className) => {
      const classPattern = new RegExp(`\\b${type}-\\S+`); // Matches 'type-' followed by non-whitespace characters
      return classPattern.test(className) ? className : `${defaultClasses[darkModeSetting][type]} ${className}`;
    };
    
    const finalClassName = getDefaultClass('background', className);
    const finalTextClassName = getDefaultClass('text', textClassName);
    
    // Add styles for the scrolling content
    const contentStyle = {
    //   maxHeight: '100%', // Example height, adjust as needed
      overflowY: 'auto',
    };
  
    return (
      <div className={`${finalClassName} duration-500 px-6 pb-6 shadow-sm rounded-2xl flex flex-col gap-2 ${header ? 'pt-4' : 'pt-6 relative'}`}>
        {(header || onClick) && (
          <div className={`${header ? 'w-full flex flex-row justify-between items-center' : 'absolute right-6'}`}>
            {header && (
              <div>
                <h4 className={`${finalTextClassName} duration-500 w-full text-sm`}>{header}</h4>
              </div>
            )}
            {onClick && (
              <div variant="plain">
                <FontAwesomeIcon onClick={onClick} className={`${finalTextClassName} duration-500 w-[1.3rem] cursor-pointer hover:text-slate-500 duration-300 text-2xl`} icon={faGrip} />
              </div>
            )}
          </div>
        )}
  
        <div style={contentStyle} className={`${childrenClass} flex flex-col h-full`}>
          {children}
        </div>
      </div>
    );
  }
  