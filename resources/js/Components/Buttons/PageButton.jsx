import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@inertiajs/react';
import React from 'react';






function PageButton({ active = false, activeClass = '', className, icon, size, href, onClick, children, inText }) {
  // Define a mapping of size to CSS class
  const sizeClass = {
    small: 'page-button-small',
    medium: 'page-button-medium',
    large: 'page-button-large',
  };

  // Determine the class based on the size prop
  const buttonClass = `page-button ${sizeClass[size] || ''} ${active ? activeClass : ''} ${className}`;


  if (href) {
    // Render a link if href is provided
    return (
      <div className='flex flex-col gap-2'>
        <Link href={href} className={buttonClass}>
          {icon && <FontAwesomeIcon icon={icon} />}
          {inText && <span className="button-text">{inText}</span>}
        </Link>
        {children && <span className="button-text">{children}</span>}
      </div>
    );
  } else {
    // Render a button if href is not provided
    return (
      <div className='flex flex-col gap-2'>
        <button onClick={onClick} className={buttonClass}> {/* Use onClick here */}
          {icon && <FontAwesomeIcon icon={icon} />}
          {inText && <span className="button-text">{inText}</span>}
        </button>
        {children && <span className="button-text">{children}</span>}
      </div>

    );
  }

  
}





export default PageButton;