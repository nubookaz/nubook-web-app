import { Link } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon

export default function NavLink({ active = false, activeClass = '', className = '', icon, children, href }) {
    
    const combinedClass = `fa-icon ${active ? activeClass : ''} ${className}`;

    return (
        <Link href={href}>
            <FontAwesomeIcon icon={icon} className={combinedClass}/>
            {children}
        </Link>
    );
}