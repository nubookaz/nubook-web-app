import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@inertiajs/react';
import React from 'react';







function SecondaryButton({ children, onClick, href, icon, className, text, buttonType }) {




    if (href) {
        // Render a link if href is provided
        return (
          <Link href={href} className={`default-btn secondary-button button-transition !py-2 ${className}`}>
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
                type={buttonType}
                >
                {children}
            </button>
        );
      }

}

export default SecondaryButton;
