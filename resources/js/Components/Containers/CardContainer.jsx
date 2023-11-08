// CardComponent.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';



function CardContainer({ children, bgColor, textColor, header, showButtonIcon, openPage, openToolkit, className, size, menuItems }) {

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
 
    const containerClasses = `container-base card-container flex flex-col gap-4 ${getSizeClass()} ${className} ${textColor}`;

        console.log(bgColor);

    // Set default prop values
    CardContainer.defaultProps = {
        menuItems: [], // Provide an empty array as a default value
    };
        
    return (
        <div className={containerClasses} style={{ background: bgColor }}>
            {header && (
                <div className="card-header flex justify-between items-center">
                    <div className="flex items-center">
                        {header && <h3 className={`secondary-color container-header text-[1.2rem] font-semibold ${textColor}`}>{header}</h3>}
                    </div>
                    {showButtonIcon && (
                        <div>
                            <Dropdown>
                                <MenuButton variant="plain" className={`secondary-color ${textColor}`}>
                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                </MenuButton>
                                <Menu placement="top-start">
                                {Array.isArray(menuItems) &&
                                    menuItems.map((item, index) => (
                                    <MenuItem key={index} onClick={item.onClick}>
                                        {item.label}
                                    </MenuItem>
                                    ))}
                                </Menu>
                            </Dropdown>
  
                        </div>
                    )}
                </div>
            )}
             {children} 
        </div>
    );






}






export default CardContainer;
