// CardComponent.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';



function CardContainer({ children, textColor, indicator, header, absoluteHeader, headerColor, showButtonIcon, openPage, openToolkit, className, size, menuItems }) {

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
 
    const cardHeaderClasses = `${absoluteHeader ? 'absolute float-left p-6' : 'flex flex-row gap-2 justify-between relative'}`;
    const containerClasses = `container-base card-container relative ${getSizeClass()} ${className} ${textColor} ${absoluteHeader ? 'relative overflow-hidden' : 'flex flex-col justify-between grow gap-2 p-4'}`;

    // Set default prop values
    CardContainer.defaultProps = {
        menuItems: [],  
    };
        
    return (
        <div className={containerClasses}>
            {header && (
                <div className={cardHeaderClasses}>
                    {header && 
                        <div className={`${absoluteHeader ? 'relative' : 'flex flex-row gap-2'}`}>
                            {indicator && <span className='rounded-full w-[1rem] h-[1rem] block' style={{ backgroundColor: headerColor }}></span>}
                            <h4 className={`secondary-color text-[1rem] font-semibold ${textColor}  `} style={{ color: headerColor }}>{header}</h4>                    
                        </div>
                    }
                    {showButtonIcon && (
                        <div className={`${absoluteHeader ? 'absolute' : 'relative'}`}>
                            <Dropdown>
                                <MenuButton variant="plain" className={`secondary-color !absolute !float-right !top-[-15px] !right-0 ${textColor}`}>
                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                </MenuButton>
                                <Menu placement="top">
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
