import { Link } from '@inertiajs/react';

function ApplicationName({ href, className}) {

    return (
        
        <>
            {href ? (
                <Link href={href} className={`application-name primary-green-color text-3xl font-bold ${className}`}>
                    Nubook
                </Link>
            ):(
                <div className={`application-name primary-green-color text-3xl font-bold ${className}`}>
                    Nubook
                </div>
            )}
        </>
 
    );
}

export default ApplicationName;