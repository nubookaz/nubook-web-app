import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@inertiajs/react';
import React from 'react';

function CircularButton({ active = false, type = 'button', activeClass = '', className = '', icon, size, href, onClick, text }) {
  // Define a mapping of size to CSS class
  const sizeClass = {
    small: 'circular-button-small',
    medium: 'circular-button-medium',
    large: 'circular-button-large',
  };

  // Determine the class based on the size prop
  const buttonClass = `circular-button ${sizeClass[size] || ''} ${active ? activeClass : ''} ${className}`;

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

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
      <button type={type} onClick={handleClick} className={buttonClass}>
        {icon && <FontAwesomeIcon icon={icon} />}
        {text && <span className="button-text">{text}</span>}
      </button>
    );
  }
}

export default CircularButton;