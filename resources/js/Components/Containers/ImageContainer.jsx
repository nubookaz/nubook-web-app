import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesome

function ImageContainer({ children, header, className, backgroundImage, isPoster, overlay, icon }) {
    const containerStyles = backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {};

    // Define the class for the <h3> based on the value of isPoster
    const headerClass = isPoster ? 'secondary-color container-header' : 'light-color container-header';

    // Define additional container styles when overlay is true (no padding)
    const overlayContainerStyles = overlay ? { padding: 0 } : {};

    const containerClassName = isPoster ? `container-base poster-container ${className}` : `container-base image-container ${className}`;

    return (
        <div loading="eager" rel="preload" className={containerClassName} style={{ ...containerStyles, ...overlayContainerStyles }}>
            {overlay && (
                <div className="image-overlay">
                    {header && (
                        <h3 className={headerClass}>
                            {icon && <FontAwesomeIcon icon={icon} className="icon mr-2" />} {/* Render the FontAwesome icon if provided */}
                            {header}
                        </h3>
                    )}
                    {children}
                </div>
            )}
            {!overlay && (
                <div className="flex flex-col items-center">
                    {header && (
                        <h3 className={headerClass}>
                            {icon && <FontAwesomeIcon icon={icon} className="icon mr-2" />} {/* Render the FontAwesome icon if provided */}
                            {header}
                        </h3>
                    )}
                    {children}
                </div>
            )}
        </div>
    );
}

export default ImageContainer;
