import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ImageContainer({ children, header, className, backgroundImage, isPoster, overlay, overlayOpacity, overlayClass, icon, enableHoverScale }) {
    const [isHovered, setIsHovered] = useState(false);

    const containerStyles = backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {};
    const hoverStyles = enableHoverScale && isHovered ? { transform: 'scale(1.2)', transition: 'transform 0.3s' } : {};

    const handleMouseEnter = () => {
        if (enableHoverScale) {
            setIsHovered(true);
        }
    };

    const handleMouseLeave = () => {
        if (enableHoverScale) {
            setIsHovered(false);
        }
    };

    const containerClass = enableHoverScale ? 'hover-scale-container' : ''; // Add a custom class for overflow: hidden

    const headerClass = isPoster ? 'secondary-color container-header' : 'light-color container-header';
    const overlayContainerStyles = overlay ? { padding: 0 } : {};
    const containerClassName = `container-base image-container h-full ease-in-out ${containerClass}`;

    return (
        <div className={`overflow-hidden rounded-lg ${className}`}>
             <div
                loading="eager"
                rel="preload"
                className={containerClassName}
                style={{ ...containerStyles, ...overlayContainerStyles, ...hoverStyles }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {overlay && (
                    <div className={`image-overlay !bg-black/${overlayOpacity} ${overlayClass}`}>
                        {header && (
                            <h3 className={headerClass}>
                                {icon && <FontAwesomeIcon icon={icon} className="icon mr-2" />}
                                {header}
                            </h3>
                        )}
                        {children}
                    </div>
                )}
                {!overlay && (
                    <div className="flex flex-col items-center w-full">
                        {header && (
                            <h3 className={headerClass}>
                                {icon && <FontAwesomeIcon icon={icon} className="icon mr-2" />}
                                {header}
                            </h3>
                        )}
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ImageContainer;
