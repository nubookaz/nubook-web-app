import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@inertiajs/react';
import React from 'react';


function IconButton({ 

    className, 
    buttonClass,
    icon, 
    iconClass,
    onClick, 
    children, 

}) {

    const renderIcon = icon && <FontAwesomeIcon className={`${iconClass} items-center text-[1.2rem]`} icon={icon} />;

 
        return (
            <div className={` ${className} flex flex-col gap-2`}>
                <button onClick={onClick} className={buttonClass}>
                    {renderIcon}
                </button>
                {children && <span className="button-text">{children}</span>}
            </div>
        );

 }


export default IconButton;