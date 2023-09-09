import React, { useState, useEffect } from 'react';
import CircularButton from '@/Components/Buttons/CircularButton';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function SlideUpModal({ isOpen, onClose, children }) {
  const [isSlideUpModalOpen, setIsSlideUpModalOpen] = useState(isOpen);

  useEffect(() => {
    setIsSlideUpModalOpen(isOpen);
  }, [isOpen]);

  const closeSlideUpModal = () => {
    setIsSlideUpModalOpen(false);
    onClose();
  };

  return (
    <div className="relative">
      <div className={`slide-up-modal z-40 ${isSlideUpModalOpen ? 'open' : 'closed'}`}>
        {isOpen && (
            <div className="modal-content h-full">
            {/* Close button */}
            <CircularButton size="small" icon={faXmark} className="close-button" onClick={closeSlideUpModal}>
                Close
            </CircularButton>
            {/* Content */}
            {children}
            </div>
        )}
        </div>
    </div>  
  );
}

export default SlideUpModal;
