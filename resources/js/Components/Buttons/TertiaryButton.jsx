import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@inertiajs/react';

function TertiaryButton({ children, onClick, icon, className, iconPosition = 'after', href }) {
  const renderIcon = icon ? <FontAwesomeIcon className={iconPosition === 'before' ? "mr-4" : "ml-4"} icon={icon} /> : null;

  if (href) {
    // Render a link if href is provided
    return (
      <Link href={href} className={`default-btn tertiary-button button-transition ${className}`}>
        {iconPosition === 'before' && renderIcon}
        {children}
        {iconPosition === 'after' && renderIcon}
      </Link>
    );
  } else {
    // Render a button if href is not provided
    return (
      <button
        className={`default-btn tertiary-button button-transition ${className}`}
        onClick={onClick}
      >
        {iconPosition === 'before' && renderIcon}
        {children}
        {iconPosition === 'after' && renderIcon}
      </button>
    );
  }
}

export default TertiaryButton;
