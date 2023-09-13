// CardComponent.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';




function CardComponent({ children, header, showButtonIcon, openPage, openToolkit, className, size, backgroundColor }) {
    const handleButtonClick = () => {
        // Check conditions to decide whether to open a page or a toolkit
        if (openPage) {
            // Logic to open a page
            console.log('Opening a page...');
        } else if (openToolkit) {
            // Logic to open a toolkit
            console.log('Opening a toolkit...');
        }
    };

    const getSizeClass = () => {
        switch (size) {
            case 'form':
                return 'form-container';
            case 'modal':
                return 'modal-container';
            case 'presentation':
                return 'presentation-container';
            default:
                return '';
        }
    };

    const getBackgroundColorClass = () => {
        switch (backgroundColor) {
            case 'light':
                return 'bg-light-color'; // Define the CSS class for light background color
            case 'dark':
                return 'primary-color'; // Define the CSS class for dark background color
            default:
                return ''; // No background color class
        }
    };

    const containerClasses = `container-base card-container ${getSizeClass()} ${className} ${getBackgroundColorClass()}`;



    


    return (
        <div className={containerClasses}>
            {header && (
                <div className="card-header flex justify-between items-center mb-4">
                    <div className="flex items-center">
                        {header && <h3 className="secondary-color container-header text-md font-normal">{header}</h3>}
                    </div>
                    {showButtonIcon && (
                        <div>
                            <button onClick={handleButtonClick} className="secondary-color">
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        </div>
                    )}
                </div>
            )}
            {children}
        </div>
    );
}

export default CardComponent;
