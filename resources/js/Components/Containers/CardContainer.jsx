// CardComponent.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';



function CardComponent({ children, header, showButtonIcon, openPage, openToolkit, className, size, backgroundColor, menuItems }) {

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

    const containerClasses = `container-base card-container flex flex-col gap-4 ${getSizeClass()} ${className} ${getBackgroundColorClass()}`;


    


    return (
        <div className={containerClasses}>
            {header && (
                <div className="card-header flex justify-between items-center">
                    <div className="flex items-center">
                        {header && <h3 className="secondary-color container-header text-md font-normal">{header}</h3>}
                    </div>
                    {showButtonIcon && (
                        <div>
                            <Dropdown>
                                <MenuButton variant="plain" className="secondary-color">
                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                </MenuButton>
                                <Menu>
                                {menuItems &&
                                    menuItems.map((item, index) => (
                                        <MenuItem key={index} onClick={item.onClick}>
                                             {item.label}
                                        </MenuItem>
                                ))}
                                </Menu>
                              
                            </Dropdown>
                            {/* <button onClick={handleButtonClick} className="secondary-color">
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button> */}
                        </div>
                    )}
                </div>
            )}
            {children}
        </div>
    );






}






export default CardComponent;
