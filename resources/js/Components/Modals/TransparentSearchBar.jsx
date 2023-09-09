import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSliders } from '@fortawesome/free-solid-svg-icons';

const TransparentSearchBar = ({ isOpen, onClose }) => {

  // Function to handle the "Escape" key press
  const handleEscapeKeyPress = (event) => {
    if (event.key === 'Escape' && isOpen) {
      onClose();
    }
  };

  // Add an event listener when the component mounts
  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKeyPress);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleEscapeKeyPress);
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (event) => {
    if (isOpen) {
      // Check if the click occurred on the overlay itself
      const isOverlay = event.target.closest('.overlay');
      if (isOverlay) {
        onClose();
      } else {
        // Prevent the default behavior to stop the click event from propagating
        event.preventDefault();
        event.stopPropagation();
      }
    }
  };

  return (

    <div className="relative">

        <div className={`search z-40 ${isOpen ? 'open' : ''}`}>
          <div className={`overlay ${isOpen ? 'open' : ''}`} onClick={handleOverlayClick}></div>
          <div className={`search-content ${isOpen ? 'open' : ''}`}>
            <div className={`input-container ${isOpen ? 'open' : ''}`}>
              <button className="search-filter">
                <FontAwesomeIcon icon={faSliders} className="filter-icon" />
              </button>
              <input type="text" placeholder="Search..." />
              <button className="search-button">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>            
          </div>
        </div>

    </div>

  );
};

export default TransparentSearchBar;
