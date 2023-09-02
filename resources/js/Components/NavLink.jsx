import { Link } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon

export default function NavLink({ active = false, activeClass = '', className = '', icon, children, ...props }) {
    
    const combinedClass = `fa-icon ${active ? activeClass : ''} ${className}`;

    return (
        <Link {...props}>
            <FontAwesomeIcon icon={icon} className={combinedClass}/> {/* Add the icon */}
            {children}
        </Link>
    );
}