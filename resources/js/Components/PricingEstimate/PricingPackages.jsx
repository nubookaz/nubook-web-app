import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CardContainer from '@/Components/Containers/CardContainer';
import { faCircleMinus } from '@fortawesome/free-solid-svg-icons';

function PricingPackages({ icon, title, description, cost }) {
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <CardContainer
      className={`pricing-package relative overflow-hidden cursor-pointer ${
        isActive ? 'active' : ''
      }`}
      onClick={toggleActive}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      tabIndex="0"
    >
      {/* Original Icon */}
      <div className="flex-none py-4 px-10 m-auto secondary-color text-xl">
        {icon && <FontAwesomeIcon icon={icon} />}
      </div>

      {/* Main Content */}
      <div className="flex-grow">
        <h3 className='primary-color font-semibold text-xl'>{title}</h3>
        <p className='secondary-color'>{description}</p>
      </div>

      {/* Cost */}
      <div className="flex-none primary-green-color font-bold text-2xl m-auto px-8">{cost}</div>

      {/* Conditional Rendering for Floating Icon */}
      {isActive && isHovered && (
        <div className="absolute -right-[1.4rem] top-1/2 transform -translate-y-1/2">
          <FontAwesomeIcon
            icon={faCircleMinus}
            className="delete w-[2.5rem] text-red-600 z-50 h-[2.5rem] drop-shadow-md"
          />
        </div>
      )}
    </CardContainer>
  );
}

export default PricingPackages;
