import { useDarkMode } from '@/Components/Contexts/DarkModeContext';

import React, { useState, useEffect } from 'react';
 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faBriefcase } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ isOpen, onClose, children, className, showCloseButton, shouldCloseOnOverlayClick = true }) => {
    const { darkModeSetting } = useDarkMode();

    const defaultClasses = {
        light: { background: 'bg-white', text: 'text-slate-900' },
        dark: { background: 'bg-slate-900', text: 'text-white' },
        midnight: { background: 'bg-slate-800', text: 'text-white' },
    };

    const [fadeIn, setFadeIn] = useState(false);
    const [fadeInDelay, setFadeInDelay] = useState(false);

    useEffect(() => {
        // Store the current overflow value
        const originalOverflow = document.body.style.overflow;

        // Set the body overflow to 'hidden' when the modal is open
        document.body.style.overflow = isOpen ? 'hidden' : originalOverflow;

        // Cleanup function to reset the overflow style to its original state
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [isOpen]);

    const handleOverlayClick = (event) => {
        event.stopPropagation();
        if (shouldCloseOnOverlayClick) {
            onClose();
        }
    };

    return (
        <div className={`modal p-8 ${isOpen ? 'modal-open' : 'modal-closed'}`}>
            <div className="modal-overlay overflow-hidden" onClick={handleOverlayClick}></div>
            <div className={`${className} modal-content overflow-hidden`} onClick={(e) => e.stopPropagation()}>
                {showCloseButton && (
                    <button className='modal-close-button' onClick={onClose}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                <div className={`fade-in-delay ${fadeInDelay ? 'opacity-1' : 'opacity-0'} modal-body h-full`}>
                    {children || <span>--- No content available ---</span>}
                </div>
            </div>
        </div>
    );
};

export default Modal;
