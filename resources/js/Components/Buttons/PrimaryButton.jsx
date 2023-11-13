import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@inertiajs/react';
import React from 'react';






function PrimaryButton({ children, onClick, className, href, icon }) {

    const classes = `default-btn primary-button button-transition ${className}`;
 

    if (href) {
        // Render a link if href is provided
        return (
          <Link href={href} className={`default-btn secondary-button button-transition cursor-pointer !py-2 ${className}`}>
            {icon && <FontAwesomeIcon icon={icon} />}
            {children}
          </Link>
        );
      } else {
        // Render a button if href is not provided
        return (
            <button
                className={`default-btn secondary-button button-transition ${className}`}
                    onClick={onClick}
                >
                {children}
            </button>
        );
      }

}

export default PrimaryButton;
