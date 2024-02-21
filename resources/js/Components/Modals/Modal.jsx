import React, { useState } from 'react';
 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ isOpen, onClose, children, className, showCloseButton }) => {

    const [fadeIn, setFadeIn] = useState(false);
    const [fadeInDelay, setFadeInDelay] = useState(false);

    const handleOverlayClick = (event) => {
        // Prevent clicks inside the modal content from closing the modal
        event.stopPropagation();
        onClose();
    };

    return (
        <div className={` modal p-8 ${isOpen ? 'modal-open' : 'modal-closed'}`}>
            <div className="modal-overlay overflow-hidden" onClick={handleOverlayClick}></div>
            <div className={` ${className} modal-content overflow-hidden`} onClick={(e) => e.stopPropagation()}>
                <div className={showCloseButton ? 'modal-header' : 'hidden'}>
                    <button className='modal-close-button cursor-pointer z-50' onClick={onClose}>
                        <FontAwesomeIcon icon={faCircleXmark}></FontAwesomeIcon>
                    </button>
                </div>
                <div className={`fade-in-delay ${fadeInDelay ? 'opacity-1' : 'opacity-0'} modal-body h-full`}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
