import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'; // Replace 'faIconName' with the desired FontAwesome icon
import { Link } from '@inertiajs/react';



function TertiaryButton({ children, onClick, className, href }) {

    if (href) {
        // Render a link if href is provided
        return (
          <Link href={href} className={`default-btn tertiary-button button-transition ${className}`}>
            {children}
            <FontAwesomeIcon className="ml-4" icon={faCaretRight} />
          </Link>
        );
      } else {
        // Render a button if href is not provided
        return (
            <button
                className={`default-btn tertiary-button button-transition ${className}`}
                    onClick={onClick}
                >
                {children}
                <FontAwesomeIcon className="ml-4" icon={faCaretRight} />
          </button>
        );
      }

}

export default TertiaryButton;
