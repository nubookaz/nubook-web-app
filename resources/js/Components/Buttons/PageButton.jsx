import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@inertiajs/react';
import React from 'react';






function PageButton({ 
  active = false, 
  activeClass = '', 
  className, 
  icon, 
  size, 
  href, 
  onClick, 
  children, 
  inText, 
  iconPosition = 'left' // Default icon position is left
}) {

    // Define a mapping of size to CSS class
    const sizeClass = {
      small: 'page-button-small',
      medium: 'page-button-medium',
      large: 'page-button-large',
    };

    // Determine the class based on the size prop
    const buttonClass = `page-button px-[1rem] ${sizeClass[size] || ''} ${active ? activeClass : ''} ${className}`;

    const renderIcon = icon && <FontAwesomeIcon className={iconPosition === 'left' ? 'mr-4' : 'ml-4'} icon={icon} />;
    const renderText = inText && <span className="button-text my-auto">{inText}</span>;


    if (href) {
        // Render a link if href is provided
        return (
            <div className='flex flex-row gap-2'>
                <Link href={href} className={buttonClass}>
                    {iconPosition === 'left' && renderIcon}
                    {renderText}
                    {iconPosition === 'right' && renderIcon}
                </Link>
                {children && <span className="button-text">{children}</span>}
            </div>
        );
    } else {
        // Render a button if href is not provided
        return (
            <div className='flex flex-row gap-2'>
                <button onClick={onClick} className={buttonClass}>
                    {iconPosition === 'left' && renderIcon}
                    {renderText}
                    {iconPosition === 'right' && renderIcon}
                </button>
                {children && <span className="button-text">{children}</span>}
            </div>
        );
    }
}




export default PageButton;