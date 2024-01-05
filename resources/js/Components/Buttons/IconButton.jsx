import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@inertiajs/react';
import React from 'react';






function IconButton({ 
  active = false, 
  activeClass = '', 
  className, 
  icon, 
  size, 
  href, 
  onClick, 
  children, 
}) {

    // Define a mapping of size to CSS class
    const sizeClass = {
      small: 'w-[45px] h-[45px]',
      medium: 'page-button-medium',
      large: 'page-button-large',
    };

    // Determine the class based on the size prop
    const buttonClass = `page-button text-center ${sizeClass[size] || ''} ${active ? activeClass : 'bg-white'} ${className}`;

    const renderIcon = icon && <FontAwesomeIcon className='items-center' icon={icon} />;


    if (href) {
        // Render a link if href is provided
        return (
            <div className='flex flex-col gap-2'>
                <Link href={href} className={`p-2 ${buttonClass}`}>
                    {renderIcon}
                </Link>
                {children && <span className="button-text">{children}</span>}
            </div>
        );
    } else {
        // Render a button if href is not provided
        return (
            <div className='flex flex-col gap-2'>
                <button onClick={onClick} className={buttonClass}>
                    {renderIcon}
                </button>
                {children && <span className="button-text">{children}</span>}
            </div>
        );
    }
}




export default IconButton;