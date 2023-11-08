import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@inertiajs/react';
import React from 'react';






function PageButton({ active = false, activeClass = '', className = '', icon, size, href, onClick, text }) {
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
      <Link href={href} className={buttonClass}>
        {icon && <FontAwesomeIcon icon={icon} />}
        {text && <span className="button-text">{text}</span>}
      </Link>
    );
  } else {
    // Render a button if href is not provided
    return (
      <button onClick={onClick} className={buttonClass}> {/* Use onClick here */}
        {icon && <FontAwesomeIcon icon={icon} />}
        {text && <span className="button-text">{text}</span>}
      </button>
    );
  }
}





export default PageButton;