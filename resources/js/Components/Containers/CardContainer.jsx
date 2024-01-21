// CardComponent.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGrip } from '@fortawesome/free-solid-svg-icons';
 

export default function CardContainer({ 
    
    children, 
    header, 
    className = '', 
    onClick,

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
    const finalTextClassName = containsTextClass(className) ? className : `text-slate-400 ${className}`;

    return (

        <div className={`${finalClassName} flex flex-col p-6 shadow-sm rounded-2xl relative`}>

            <div className='flex flex-row justify-between w-full items-center mb-2'>
                {header && (
                    <div className=' '>
                        <h4 className={`${finalTextClassName} w-full text-sm`}>{header}</h4>
                    </div>
                )}
            
                {onClick && (
                    <div variant="plain" className=' '>
                        <FontAwesomeIcon onClick={onClick}  className={`${finalTextClassName} w-[1.3rem] cursor-pointer hover:text-slate-500 duration-300 text-2xl`} icon={faGrip} />
                    </div>
                )}
            </div>

            {children} 
                   
        </div>

    );


}

 